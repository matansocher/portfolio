import './styles/CookieNotice.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dismissCookieNotice, isCookieNoticeDismissed, OPEN_COOKIE_NOTICE_EVENT } from '@/cookieNotice';

export default function CookieNotice() {
  const [isOpen, setIsOpen] = useState(() => !isCookieNoticeDismissed());

  useEffect(() => {
    const openSettings = () => setIsOpen(true);
    window.addEventListener(OPEN_COOKIE_NOTICE_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_NOTICE_EVENT, openSettings);
  }, []);

  const dismiss = () => {
    dismissCookieNotice();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <section className="cookie-notice" aria-labelledby="cookie-notice-title">
      <div className="cookie-notice-copy">
        <h2 id="cookie-notice-title">Cookie notice</h2>
        <p>
          This site uses browser storage for preferences and Google Analytics cookies to understand visits and improve
          the site. Read the <Link to="/cookies">Cookie Policy</Link>.
        </p>
      </div>
      <button type="button" className="cookie-notice-dismiss" onClick={dismiss}>
        Got it
      </button>
    </section>
  );
}
