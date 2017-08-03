import socket from "socket.io";
import Koa from "koa";
import Router from "koa-router";
import body from 'koa-bodyparser';
import { execute, subscribe } from 'graphql';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from "http";
import next from "next";
import schema from "./gql";
import * as host from "./pubsub/host";

const dev = process.env.NODE_ENV !== 'production';
const web = next({ dir: "./server/web", dev });


const server = new Koa();
const router = new Router();

const handle = web.getRequestHandler();
Promise.all([web.prepare()]).then(() => {

  server.use(body());


  router.post('/graphql',async (ctx, next) => {
    return next();
  }, (ctx, next) => graphqlKoa({
    schema,
    rootValue: {},
    context: ctx
  })(ctx, next));

  router.get('/graphql', graphiqlKoa({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:3030/subscriptions`
  }));

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })



  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())

  let srv = createServer(server.callback());
  let so = socket(srv);
  so.on("connection", (client) => {
    console.log("connection", client.conn.id);
    const cid = client.conn.id;
    host.addHost(cid)
    client.on("disconnect", () => {
      host.removeHost(cid);
    })
    client.on("pm2-connect", (data) => {
      host.setData(cid, data);
    })
  })
  srv.listen(3030,  () => {
    new SubscriptionServer({
      schema,
      subscribe,
      execute,
      onConnect: (param,ws) => {
        // console.log("onConnect", ws._socket.remoteAddress);

      },
      onDisconnect: (ws) => {
        // console.log("disconnect", ws);

      }
    }, {
      server: srv,
      path: '/subscriptions',
    });
  })


})
