import './styles/Footer.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-inner">
        <div className="site-footer-cols">
          <div className="site-footer-brand-col">
            <Link to="/" className="site-footer-brand">
              Dekel Nissim
            </Link>
            <p className="site-footer-tag">
              Product Designer &amp; UX Researcher crafting clear, human-centered digital products.
            </p>
          </div>

          <nav className="site-footer-col" aria-label="Explore">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/">Projects</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </nav>

          <nav className="site-footer-col" aria-label="Get in touch">
            <h4>Get in touch</h4>
            <ul>
              <li>
                <a href="mailto:dklnsm@gmail.com">dklnsm@gmail.com</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/dekelnissim/" target="_blank" rel="me noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <Link to="/business-card">Business card</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site-footer-bottom">
          <span>© {year} Dekel Nissim. All rights reserved.</span>
          <span>Designed &amp; built with care.</span>
        </div>
      </div>
    </footer>
  );
}
