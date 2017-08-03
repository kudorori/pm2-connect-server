import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";


// import query from "./query";
import subscript from "./subscript";
console.log(subscript);

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQuery",
    fields: {
      a: {
        type: GraphQLString
      }
    }
  }),
  subscription: new GraphQLObjectType({
    name: "RootSubScription",
    fields: subscript
  })
})
