import React, {Component} from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import withData from "../lib/withData";
import get from "../gql/get";
import {
  graphql
} from "react-apollo";
import HostStats from "../components/HostStats";

@withData
@graphql(get, {
  props: ({data}) => ({
    data
  })
})
export default class extends Component{
  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUpdate(nextProps, nextState) {

  }
  componentDidUpdate() {

  }
  render() {
    console.log(this.props)
    const { data : { hostList = [] }} = this.props;

    return (
      <div className="root">
        {
          hostList.map((item, index) => (
            <HostStats {...item} key={index}></HostStats>
          ))
        }
        <style jsx>{`
          .root {
            padding: 12px;
          }
        `}</style>
      </div>
    )
  }
}
