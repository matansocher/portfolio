import './styles/NotFound.scss';
import { Link } from 'react-router-dom';
import { Footer, SiteNav } from '@/components';
import config from '@/config';

const SUGGESTED_LINKS: { label: string; description: string; to: string }[] = [
  ...config.PROJECTS.map((project) => ({
    label: project.title,
    description: project.summary,
    to: project.path,
  })),
  {
    label: 'Articles',
    description: 'Writing on UX research and product design, in English and Hebrew.',
    to: '/articles',
  },
];

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <div className="home-page not-found-page">
        <main>
          <section className="nf-hero" aria-labelledby="nf-title">
            <div className="hp-content">
              <p className="hp-hero-eyebrow hp-mono">Error 404 · Page not found</p>
              <p className="nf-code" aria-hidden="true">
                404
              </p>
              <h1 id="nf-title">
                This page took an <span className="hp-accent">unexpected turn.</span>
              </h1>
              <p className="hp-hero-subcopy">
                The page you are looking for doesn&apos;t exist, may have moved, or the link might be broken. Let&apos;s
                get you back to something useful.
              </p>
              <div className="hp-hero-cta">
                <Link className="hp-btn hp-btn-accent" to="/">
                  Back to home
                </Link>
                <Link className="hp-text-link" to="/business-card">
                  Get in touch
                </Link>
              </div>
            </div>
          </section>

          <section className="nf-suggestions" aria-labelledby="nf-suggestions-title">
            <div className="hp-content">
              <div className="hp-section-head">
                <span className="hp-mono">Where to next</span>
                <h2 id="nf-suggestions-title">A few places worth exploring</h2>
              </div>
              <div className="nf-links">
                {SUGGESTED_LINKS.map((link) => (
                  <Link key={link.to} to={link.to} className="nf-link-card">
                    <h3>{link.label}</h3>
                    <p>{link.description}</p>
                    <span className="nf-link-cue">
                      Explore
                      <i className="uil uil-arrow-right" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
