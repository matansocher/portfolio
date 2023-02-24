import '../styles/Footer.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BottomNavigation } from '.';
import assets from '../assets';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { pathname } = useLocation();
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShowCopied(false);
    }, 3000);
    return () => clearTimeout(timeOutId);
  }, [showCopied]);

  if (pathname !== '/') {
    return <BottomNavigation pathname={pathname} />
  }

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-content-left">
          <p>Let’s talk! I would love to hear from you:</p>
        </div>
        <div className="footer-content-right">
          <CopyToClipboard text="dklnsm@gmail.com" onCopy={(val) => {setShowCopied(true)}}>
            <div className="link">
              <p>dklnsm@gmail.com</p>
              <img alt="mail icon" src={assets.copyIcon} />
              <div className="copied" style={{ opacity: showCopied ? 1 : 0 }}><p>Copied!</p></div>
            </div>
          </CopyToClipboard>
          <Link className="link" to="//www.linkedin.com/in/dekelnissim" target="_blank" style={{ textDecoration: 'none' }}>
            <img alt="brand linkedin icon" src={assets.brandLinkedinIcon} />
            <p>my LinkedIn</p>
          </Link>
          <Link className="link" to="//dribbble.com/d27" target="_blank" style={{ textDecoration: 'none' }}>
            <img alt="dribbble icon" src={assets.dribbbleIcon} />
            <p>Dribbble</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
