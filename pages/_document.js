import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src='/js/all.js'></script>
          <link rel='shortcut icon' href='/static/favicon.ico' />
        </Head>
        <body className={'js-enabled lbh-body'}>
          <Main />
          <NextScript />
          {process.env.ANALYTICS_ENABLED && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WGX2SMF2" height="0" width="0" style="display: none; visibility: hidden;" />',
              }}
            />
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
