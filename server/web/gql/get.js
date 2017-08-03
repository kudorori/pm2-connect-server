import { gql } from "react-apollo";
export default gql`
subscription {
hostList {
  hostname
  uptime
  totalmem
  freemem
  release
  cpus
  networkInterfaces
  arch
  tmpdir
  endianness
  type
  platform
  processList {
    pid
    name
    pm2_env {
      pm_exec_path
      pm_uptime
      restart_time
      unstable_restarts
      status
    }
  }
}
}
`;
