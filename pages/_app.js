import '../styles/globals.scss'
import '../styles/globals.css'
import '../styles/cookieBanner.css'
import React from 'react';
import App from 'next/app'
import Header from '../compoments/header';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar'
import redirectIfMaintenanceMode from '../helpers/redirectIfMaintenanceMode';
import Script from 'next/script'
import { CookieBanner } from '../compoments/cookieBanner'

function MyApp({ Component, pageProps, err  }) {
  const enableJavascript = () => {
    window.GOVUKFrontend.initAll()
  }
  useEffect(enableJavascript, [])
  useEffect(() => {
    hotjar.initialize(3085563, 6)
  }, [])

  useEffect(redirectIfMaintenanceMode, [])

  useEffect(() => {
    var path = window.location.pathname === '/' ? ' index' :  window.location.pathname
    var pageTitle = path.replaceAll('-',' ').replaceAll('/',' - ')
    document.title = 'Housing Repairs' + pageTitle
  })

  var gtmTokenId = process.env.NEXT_PUBLIC_GTM_TOKEN_ID || '';

  return <>
    { gtmTokenId && (
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', ${gtmTokenId});
        `}
      </Script>
    )}
    <Header/>
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-!-padding-0">
        <Component {...pageProps} err={err} />
      </main>
    </div>
    <footer className="govuk-footer" role="contentinfo">
      <div className="govuk-width-container">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 className="govuk-visually-hidden">Support links</h2>
            <div>
              <a className="footer-custom-link" href="https://hackney.gov.uk/accessibility-help">Accessibility</a>
            </div>
            <svg
              aria-hidden="true"
              focusable="false"
              className="govuk-footer__licence-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 483.2 195.7"
              height="17"
              width="41"
            >
              <path
                fill="currentColor"
                d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
              />
            </svg>
            <span className="govuk-footer__licence-description">
              {'All content is available under the '}
              <a
                className="govuk-footer__link"
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                rel="license"
              >
                Open Government Licence v3.0
              </a>
            , except where otherwise stated
            </span>
          </div>
        </div>
      </div>
    </footer>
    <CookieBanner />
  </>
}
App.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp
