import '../styles/globals.css'
import '../styles/globals.scss'
import React from 'react';
import App from 'next/app'
import Link from 'next/link'
import { useEffect } from 'react';

function MyApp({ Component, pageProps, err  }) {
  const enableJavascript = () => {
    window.GOVUKFrontend.initAll()
  }
  useEffect(enableJavascript, [])

  return <>
    <header className="govuk-header " role="banner" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="https://www.lincoln.gov.uk/" className="govuk-header__logotype" target="_blank" rel="noopener noreferrer"/>
        </div>
        <div className="govuk-header__content">
          <Link href="/">
            <a
              className="govuk-header__link govuk-header__link--service-name">
              Housing Repairs Online
            </a>
          </Link>
        </div>
      </div>
    </header>

    <div className="govuk-width-container">
      <div className="govuk-phase-banner" data-testid="phase-banner">
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag"  data-testid="phase-banner">
            Beta
          </strong>
          <span className="govuk-phase-banner__text">
             This service is still in beta
          </span>
        </p>
      </div>
      <main className="govuk-main-wrapper govuk-!-padding-0">
        <Component {...pageProps} err={err} />
      </main>
    </div>
    <footer className="govuk-footer " role="contentinfo">
      <div className="govuk-width-container ">
        <a className="footer-custom-link" href="https://www.lincoln.gov.uk/accessibility">Accessibility</a>
        <div className="govuk-footer__meta">
          <div
            className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <span className="govuk-footer__licence-description">
              All content is available under the <a className="govuk-footer__link"
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                rel="license">Open Government Licence v3.0</a>, except where otherwise stated
            </span>
          </div>
          <div className="govuk-footer__meta-item">
            <a className="govuk-footer__link govuk-footer__copyright-logo"
              href="https://www.lincoln.gov.uk" target="_blank" rel="noopener noreferrer" >©
              Crown copyright</a>
          </div>
        </div>
      </div>
    </footer>
  </>
}
App.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp
