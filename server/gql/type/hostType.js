import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList
} from "graphql"
import processType from "./processType";

export default new GraphQLObjectType({
  name: "HOST",
  fields: {
    hostname: {
      type: GraphQLString
    },
    uptime: {
      type: GraphQLString
    },
    loadavg: {
      type: new GraphQLList(GraphQLString)
    },
    totalmem: {
      type: GraphQLString
    },
    freemem: {
      type: GraphQLString
    },
    release: {
      type: GraphQLString
    },
    cpus: {
      type: GraphQLString
    },
    networkInterfaces: {
      type: GraphQLString
    },
    arch: {
      type: GraphQLString
    },
    tmpdir: {
      type: GraphQLString
    },
    endianness: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    platform: {
      type: GraphQLString
    },
    processList: {
      type: new GraphQLList(processType)
    }
  }
})
