import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
// import { useLocation } from 'react-router-dom';
import './styles/ScrollToTopOnScroll.scss';
import assets from '../assets';

export default function ScrollToTopOnScroll() {

  // const { pathname } = useLocation();
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
    // bottom: pathname === '/' ? '20px' : '110px'
    <div className="scroll-to-top-button" style={{ bottom: '110px' }} onClick={scrollTop}>
      <img alt="arrow" src={assets.arrowIcon} />
    </div>
  ) : null;
}
