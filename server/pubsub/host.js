import pubsub from "./pubsub";
import DataLoader from "dataloader";

const loader = new DataLoader(keys => new Promise((resolve, reject) => {
  resolve(keys.map(key => `${key} loadding`));
}))

const action = "host";
let hosts = [];
let cache = [];

export const addHost = (id) => {
  hosts.push(id);
  console.log(`add host ${id}, now connection count: ${hosts.length}`);
}

export const removeHost = (id) => {
  hosts = hosts.filter(item => item != id);
  loader.clear(id);
  pubsub.publish(action, loader.loadMany(hosts))
  console.log(`remove host ${id}, now connection count: ${hosts.length}`);
}

export const setData = (host, data) => {
  console.log(`${host} send data`);
  loader.clear(host).prime(host, data)
  pubsub.publish(action, loader.loadMany(hosts))
}

export const subscribe = () => pubsub.asyncIterator(action);
