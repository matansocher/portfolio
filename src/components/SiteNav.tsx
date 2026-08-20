import './styles/SiteNav.scss';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import config from '../config';
import SearchDialog from './SearchDialog';

export default function SiteNav() {
  const location = useLocation();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const projectsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setIsProjectsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const isSlash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey;
      if (isCmdK || (isSlash && !isTypingTarget(event.target))) {
        event.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (projectsRef.current && !projectsRef.current.contains(event.target as Node)) {
        setIsProjectsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsProjectsOpen(false);
    };
    document.addEventListener('mousedown', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const isProjectsActive = config.PROJECTS.some((project) => isActive(project.path));

  return (
    <header className="site-nav" aria-label="Primary">
      <div className="site-nav-inner">
        <Link to="/" className="site-nav-brand">
          Dekel Nissim
        </Link>

        <div className="site-nav-center">
          <button
            type="button"
            className="site-nav-search"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            aria-haspopup="dialog"
          >
            <i className="uil uil-search" aria-hidden="true" />
            <span className="site-nav-search-label">Search</span>
            <span className="site-nav-search-kbd" aria-hidden="true">
              ⌘K
            </span>
          </button>
        </div>

        <div className="site-nav-right">
          <ul className="site-nav-links">
            {config.NAV_LINKS.map((link) => {
              if (link.label === 'Projects') {
                return (
                  <li key={link.path} className="site-nav-item has-dropdown" ref={projectsRef}>
                    <button
                      type="button"
                      className={`site-nav-link ${isProjectsActive ? 'active' : ''}`}
                      aria-haspopup="true"
                      aria-expanded={isProjectsOpen}
                      onClick={() => setIsProjectsOpen((open) => !open)}
                    >
                      {link.label}
                      <i className="uil uil-angle-down" aria-hidden="true" />
                    </button>
                    <ul className={`site-nav-dropdown ${isProjectsOpen ? 'open' : ''}`}>
                      {config.PROJECTS.map((project) => (
                        <li key={project.key}>
                          <Link to={project.path} className="site-nav-dropdown-link">
                            {project.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={link.path} className="site-nav-item">
                  <Link to={link.path} className={`site-nav-link ${isActive(link.path) ? 'active' : ''}`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <a
            href="https://www.linkedin.com/in/dekelnissim/"
            className="site-nav-social"
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Dekel Nissim on LinkedIn"
          >
            <i className="uil uil-linkedin" aria-hidden="true" />
          </a>

          <Link to="/business-card" className="site-nav-contact">
            Contact
          </Link>
        </div>
      </div>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
