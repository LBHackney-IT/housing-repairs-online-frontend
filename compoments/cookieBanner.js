import { useState, useEffect } from 'react';
import cookies from 'cookie-cutter'
import Link from 'next/link';

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)

  const acceptCookies = () => {
    cookies.set('hrolAcceptCookies','Accepted')
    setShowBanner(false)
  }

  useEffect(() => {
    if (cookies.get('hrolAcceptCookies') !== 'Accepted') {
        setShowBanner(true)
    }
  })

  return (
    <div >
        {showBanner && (
            <div className='cookiebanner'>
              <p>
                We use cookies to ensure you have the best experience. For full details see our <u><Link href="https://hackney.gov.uk/privacy">privacy statement</Link></u>
                
                <button className="cookiebannerbutton" type="button" onClick={acceptCookies}>Accept and close</button>
              </p>
              
            </div>
        )}
    </div>
  )
}