import './styles/SiteNav.scss';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import config from '../config';

export default function SiteNav({ transparent = false }: { transparent?: boolean }) {
  const location = useLocation();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const projectsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setIsProjectsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(document.documentElement.scrollTop > 30);
    onScroll();
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, []);

  useEffect(() => {
    if (!showCopied) return;
    const timeoutId = setTimeout(() => setShowCopied(false), 3000);
    return () => clearTimeout(timeoutId);
  }, [showCopied]);

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

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const classNames = ['site-nav'];
  if (transparent && !isScrolled) classNames.push('transparent');

  return (
    <header className={classNames.join(' ')} aria-label="Primary">
      <div className="site-nav-inner">
        <Link to="/" className="site-nav-brand">
          Dekel Nissim
        </Link>

        <div className="site-nav-right">
          <ul className="site-nav-links">
            {config.NAV_LINKS.map((link) => {
              if (link.label === 'Projects') {
                return (
                  <li key={link.path} className="site-nav-item has-dropdown" ref={projectsRef}>
                    <button
                      type="button"
                      className={`site-nav-link ${isActive(link.path) ? 'active' : ''}`}
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

          <CopyToClipboard text="dklnsm@gmail.com" onCopy={() => setShowCopied(true)}>
            <div className="site-nav-email">
              <p>dklnsm@gmail.com</p>
              <div className="site-nav-copied" style={{ opacity: showCopied ? 1 : 0 }}>
                <p>Copied!</p>
              </div>
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </header>
  );
}
