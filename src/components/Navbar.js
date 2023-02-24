import { useEffect } from 'react';
import '../styles/Navbar.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({ isCardNav = false, scrollToForm = null, isWhiteText = false }) {
  const [isScrolledABit, setIsScrolledABit] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolledABit = document.documentElement.scrollTop > 75;
      setIsScrolledABit(isScrolledABit);
    };
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, []);

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
          {isCardNav ? <button>Dekel Nissim</button> : null}
          {!isCardNav ? <Link to="/">Dekel Nissim</Link> : null}
        </div>
        <div className="header-content-right">
          {/* {!isCardNav ? <Link to="work">Work</Link> : null} */}
          {/* {!isCardNav ? <Link to="blog">Blog</Link> : null} */}
          {/* {!isCardNav ? <Link to="card">Contact</Link> : null} */}
          {isCardNav ? <button onClick={scrollToForm}>Contact Me</button> : null}
          <Link to="#" onClick={(e) => {window.location.href = 'mailto:dklnsm@gmail.com'; e.preventDefault()} }>
            dklnsm@gmail.com
          </Link>
        </div>
      </div>
    </header>
  );
}
