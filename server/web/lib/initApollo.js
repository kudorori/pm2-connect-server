// import WebSocket from 'ws';
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import fetch from 'isomorphic-fetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}


function create (headers, initialState, {getToken}) {
  let wsClient = null;
  let networkInterfaceWithSubscriptions
  const networkInterface = createNetworkInterface({
    uri: `http://${headers.host}/graphql`, // Server URL (must be absolute)
    opts: { // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    },
    notifyOnNetworkStatusChange: true
  });


  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      // get the authentication token from local storage if it exists
      const token = getToken();
      req.options.headers.token = token ? `${token}` : null;
      next();
    }
  }])

  if(process.browser){
    networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
      networkInterface,
      new SubscriptionClient(`ws://${headers.host}/subscriptions`, {
        reconnect: true
      })
    );
  }


  return new ApolloClient({
    initialState,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface: !process.browser ? networkInterface : networkInterfaceWithSubscriptions
  })
}

export default function initApollo (headers, initialState = {}, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(headers, initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(headers, initialState, options)
  }

  return apolloClient
}
