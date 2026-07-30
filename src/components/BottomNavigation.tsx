import './styles/BottomNavigation.scss';
import { useState, useEffect } from 'react';
import config from '../config';
import { Link } from 'react-router-dom';
import assets from '../assets';
import type { NavigationItem } from '../types';

export default function BottomNavigation({ pathname }: { pathname: string }) {
  const [navigationPrev, setNavigationPrev] = useState<NavigationItem | null>(null);
  const [navigationNext, setNavigationNext] = useState<NavigationItem | null>(null);

  useEffect(() => {
    const navigationDictionaryItem = config.NAVIGATION_DICTIONARY[pathname] || config.NAVIGATION_DICTIONARY['/'];
    setNavigationPrev(config.NAVIGATION_DICTIONARY[navigationDictionaryItem.prev as string] ?? null);
    setNavigationNext(config.NAVIGATION_DICTIONARY[navigationDictionaryItem.next as string] ?? null);
  }, [pathname]);

  if (!navigationPrev && !navigationNext) {
    return null;
  }

  return (
    <div className="bottom-navigation content">
      <div className="bottom-navigation-content">
        {navigationPrev ? (
          <Link to={navigationPrev.path} style={{ textDecoration: 'none' }} className="bottom-navigation-content-left">
            <div className="nav-item">
              <span>Previous</span>
              <img alt="previous arrow" src={assets.navigationArrow} />
            </div>
            <p>{navigationPrev.displayName}</p>
          </Link>
        ) : (
          <div></div>
        )}
        {navigationNext ? (
          <Link to={navigationNext.path} style={{ textDecoration: 'none' }} className="bottom-navigation-content-right">
            <div className="nav-item">
              <span>Next</span>
              <img alt="next arrow" src={assets.navigationArrow} />
            </div>
            <p>{navigationNext.displayName}</p>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
