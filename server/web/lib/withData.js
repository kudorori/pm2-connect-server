import React from 'react'
import cookie from 'cookie'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import initApollo from './initApollo';


function parseCookies (ctx = {}, options = {}) {
  if(ctx.req!=undefined) {
    return cookie.parse(ctx.req.headers.cookie ? ctx.req.headers.cookie : "", options )
  }else {
    return cookie.parse(document.cookie, options);
  }

}

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`
    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps (ctx) {
      const headers = ctx.req ? ctx.req.headers : {}
      let serverState = {}

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}

      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo(headers, serverState, {

        })
        // Provide the `url` prop data in case a graphql query uses it
        const url = {query: ctx.query, pathname: ctx.pathname}

        // Run all graphql queries
        const app = (
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        )


        // Extract query data from the Apollo's store
        await getDataFromTree(app)
        const state = apollo.getInitialState();
        // console.log(state, "STETA");

        serverState = {
          apollo: { // Make sure to only include Apollo's data state
            data: state.data
          }
        }
      }

      return {
        serverState,
        headers,
        ...composedInitialProps
      }
    }

    constructor (props) {
      super(props)
      this.apollo = initApollo(this.props.headers, this.props.serverState, {
        getToken: () => parseCookies().token
      })
      
    }

    render () {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
