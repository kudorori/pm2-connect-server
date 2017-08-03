import React, {Component} from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";

export default ({
  name,
  pm2_env: {
    PM2_HOME,
    pm_exec_path,
    pm_out_log_path,
    pm_err_log_path,
    pm_id,
    restart_time,
    unstable_restarts,
    node_version,
    status
  }
}) => (
  <div className="root mui-panel">
    <div>
      name: {name}
    </div>
    <div>
      PM2_HOME: {PM2_HOME}
    </div>
    <div>
      pm_exec_path: {pm_exec_path}
    </div>
    <div>
      unstable_restarts: {unstable_restarts}
    </div>
    <div>
      restart_time: {restart_time}
    </div>
    <div>
      status: {status}
    </div>
    <div className="actions">

    </div>
    <style jsx>{`

    `}</style>
  </div>
)
