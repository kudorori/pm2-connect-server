import {
  GraphQLList
} from "graphql"
import { hostType, processType } from "../type";
import { subscribe } from "../../pubsub/host";
export default {
  hostList: {
    type: new GraphQLList(hostType),
    subscribe,
    resolve(root, args, ctx) {
      return root;
    }
  }
}
