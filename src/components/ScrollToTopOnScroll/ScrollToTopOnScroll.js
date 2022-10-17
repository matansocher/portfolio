import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import './ScrollToTopOnScroll.scss';

export default function ScrollToTopOnScroll() {

  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isShow = document.documentElement.scrollTop > 750;
      setShow(isShow);
    };
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, []);

  const scrollTop = () => {
    scroll.scrollToTop(); 
  }

  return show ? (
    <div className="scroll-to-top-button" style={{ bottom: pathname === '/' ? '20px' : '110px' }} onClick={scrollTop}></div>
  ) : null;
}
