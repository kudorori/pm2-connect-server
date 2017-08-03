import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class extends Document {
  static async getInitialProps({ pathname, renderPage, req }) {
    const { html, head, errorHtml, chunks }  = renderPage();
    const styles = flush();


    return { html, head, errorHtml, chunks, styles}
  }

  render() {
    return (
      <html>
        <Head>
          <title>{this.props.pathname}</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          {/* <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' /> */}
          <link href="//cdn.muicss.com/mui-0.9.20/css/mui.min.css" rel="stylesheet" type="text/css" />
          <script src="//cdn.muicss.com/mui-0.9.20/js/mui.min.js"></script>
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons' />
          <script src="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyDHlhjup9DDLL7iTzaFpm1JUXU7x37zhmY"></script>
          <style>{`
            body, html{
              margin: 0px;
              font-size: 10px;
              font-size-adjust: none;
            }
            h3 {
              text-align: center;
              padding: 24px 0px;
              margin: 0px;
            }
          `}</style>
        </Head>
        <body>

          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
// <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
// <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />
