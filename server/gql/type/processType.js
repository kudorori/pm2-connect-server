import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType
} from "graphql"

const string = {
  type: GraphQLString
}

export default new GraphQLObjectType({
  name: "PROCESS",
  fields: {
    pid: string,
    name: string,
    pm2_env: {
      type: new GraphQLObjectType({
        name: "pm2_env",
        fields: {
          pm_exec_path: string,
          pm_uptime: string,
          restart_time: string,
          unstable_restarts: string,
          status: string,
          PM2_HOME: string
        }
      })
    },
    toString: {
      type: GraphQLString,
      resolve: (root, args, ctx) => JSON.stringify(root)
    }
  }
})
