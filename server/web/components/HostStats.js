import React, {Component} from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import ProcessStats from "./ProcessStats";
import {PieChart, Pie, Legend, Tooltip, Cell} from "recharts";

const toKB = num => Math.floor(num / 1024);
const toMB = num => Math.floor(toKB(num) / 1024);
const toGB = num => Math.floor(toMB(num) / 1024)

export default ({
  hostname,
  uptime,
  totalmem,
  freemem,
  processList = []
}) => (
  <div className="root ">
    <div>
      HostName: {hostname}
    </div>
    <div>
      uptime: {uptime} 秒
    </div>
    <div>
      totalram: {toGB(totalmem)}GB
    </div>
    <div>
      freeram: {toMB(freemem)}MB
    </div>
    <PieChart  width={800} height={400}>
      <Pie isAnimationActive={false} data={[{name: "totalram", value: toMB(totalmem)}, {name: "free", value:toMB(freemem)}]} cx={200} cy={200} outerRadius={80} label>
        <Cell fill="red"/>
        <Cell fill="green"/>
      </Pie>
    </PieChart>
    <div class="mui-divider"></div>
    <div>
      {
        processList.map((item, index) => (
          <ProcessStats {...item} key={index}></ProcessStats>
        ))
      }
    </div>
    <style jsx>{`
      .root {
        /*border: 1px solid #ddd;*/
      }
    `}</style>
  </div>
)
