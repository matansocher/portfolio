import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import './ScrollToTopOnScroll.scss';

export default function ScrollToTopOnScroll() {

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
    <div className="scroll-to-top-button" onClick={scrollTop}></div>
  ) : null;
}
