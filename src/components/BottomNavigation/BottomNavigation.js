import './BottomNavigation.scss';
import { useState, useEffect } from 'react';
import config from '../../config';
import { Link } from 'react-router-dom';
import { fatArrow } from '../../assets/shared';

export default function BottomNavigation({ pathname }) {

  const [navigationPrev, setNavigationPrev] = useState(null);
  const [navigationNext, setNavigationNext] = useState(null);

  useEffect(() => {
    console.log(pathname);
    const navigationDictionaryItem = config.NAVIGATION_DICTIONARY[pathname] || config.NAVIGATION_DICTIONARY['/'];
    console.log(navigationDictionaryItem);
    setNavigationPrev(config.NAVIGATION_DICTIONARY[navigationDictionaryItem.prev]);
    setNavigationNext(config.NAVIGATION_DICTIONARY[navigationDictionaryItem.next]);
  }, [pathname]);

  if (!navigationPrev && !navigationNext) {
    return null;
  }

  return (
    <div className="bottom-navigation content">
      <div className="bottom-navigation-content">
        {navigationPrev ? <Link to={navigationPrev.path} style={{ textDecoration: 'none' }} className="bottom-navigation-content-left">
          <div className="nav-item">
            <span>Previous</span>
            <img alt="previous arrow" src={fatArrow} />
          </div>
          <p>{ navigationPrev.displayName }</p>
        </Link> : <div></div>}
        {navigationNext ? <Link to={navigationNext.path} style={{ textDecoration: 'none' }} className="bottom-navigation-content-right">
          <div className="nav-item">
            <span>Next</span>
            <img alt="next arrow" src={fatArrow} />
          </div>
          <p>{ navigationNext.displayName }</p>
        </Link> : <div></div>}
      </div>
    </div>
  );
}