import { useState, useEffect } from 'react';
import './styles/Navbar.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

export default function Navbar({ isCardNav = false, scrollToForm = null, isWhiteText = false }) {
  const [isScrolledABit, setIsScrolledABit] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolledABit = document.documentElement.scrollTop > 30;
      setIsScrolledABit(isScrolledABit);
    };
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShowCopied(false);
    }, 3000);
    return () => clearTimeout(timeOutId);
  }, [showCopied]);

  const getClass = () => {
    const classes = [];
    if (isScrolledABit) classes.push('scrolled');
    if (isWhiteText) classes.push('white-text');
    return classes.join(' ');
  }

  return (
    <header className={getClass()}>
      <div className="header-content">
        <div className="header-content-left">
          <Link to="/">Dekel Nissim</Link>
        </div>
        <div className="header-content-right">
          {!isCardNav ? <Link to="card">Contact</Link> : null}
          {isCardNav ? <button onClick={scrollToForm}>Contact Me</button> : null}
          <CopyToClipboard text="dklnsm@gmail.com" onCopy={(val) => {setShowCopied(true)}}>
            <div className="link">
              <p>dklnsm@gmail.com</p>
              <div className="copied" style={{ opacity: showCopied ? 1 : 0 }}><p>Copied!</p></div>
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </header>
  );
}
