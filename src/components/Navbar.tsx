import { useState, useEffect } from 'react';
import './styles/Navbar.scss';
import { Link } from 'react-router-dom';

export default function Navbar({
  isCardNav = false,
  scrollToForm,
  isWhiteText = false,
}: {
  isCardNav?: boolean;
  scrollToForm?: () => void;
  isWhiteText?: boolean;
}) {
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
  };

  return (
    <header className={getClass()}>
      <div className="header-content">
        <div className="header-content-left">
          <Link to="/">Dekel Nissim</Link>
        </div>
        <div className="header-content-right">
          {isCardNav ? (
            <button className="contact" onClick={scrollToForm}>
              Contact Me
            </button>
          ) : null}
          <Link to="/contact" className="link contact-link">
            <p>Contact</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
