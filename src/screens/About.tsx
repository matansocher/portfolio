import './styles/About.scss';
import { Link } from 'react-router-dom';
import assets from '../assets';
import { SiteNav } from '../components';

const services = [
  {
    icon: 'uil uil-search',
    title: 'UX Research',
    text: 'Interviews, usability testing, and behavioral analysis that turn assumptions into decisions the whole team trusts.',
  },
  {
    icon: 'uil uil-layer-group',
    title: 'Product Design',
    text: 'End-to-end flows and interfaces, from first wireframe to polished, developer-ready design.',
  },
  {
    icon: 'uil uil-swatchbook',
    title: 'Design Systems',
    text: 'Scalable component libraries and design tokens that keep fast-moving teams consistent.',
  },
  {
    icon: 'uil uil-chart-line',
    title: 'Product Strategy',
    text: 'Aligning design work with real business goals so every screen moves a metric that matters.',
  },
];

const approach = [
  {
    step: '01',
    title: 'Understand',
    text: 'I start with people and problems, not screens. Research first, opinions second.',
  },
  {
    step: '02',
    title: 'Define',
    text: 'I frame the real problem and the decision we are trying to make before designing anything.',
  },
  { step: '03', title: 'Design', text: 'Rapid, testable design that I put in front of users early and often.' },
  {
    step: '04',
    title: 'Deliver',
    text: 'Clear, well-documented handoff and close partnership with engineering through launch.',
  },
];

export default function About() {
  return (
    <>
      <SiteNav />
      <main className="about page">
        <section className="about-hero">
          <div className="container about-hero-inner">
            <div className="about-hero-text">
              <p className="about-eyebrow">About Dekel</p>
              <h1>Product Designer & UX Researcher who designs with evidence.</h1>
              <p className="about-lead">
                I help teams build products people actually understand and enjoy using. For the past several years I
                have partnered with startups, enterprises, and public-sector teams to turn messy problems into clear,
                human-centered experiences.
              </p>
              <div className="about-hero-cta">
                <Link to="/projects" className="about-btn primary">
                  View my work
                </Link>
                <Link to="/articles" className="about-btn secondary">
                  Read my articles
                </Link>
              </div>
            </div>
            <div className="about-hero-image">
              <img src={assets.dekel} alt="Dekel Nissim" />
            </div>
          </div>
        </section>

        <section className="about-intro">
          <div className="content">
            <h2>Design is a way of thinking, not a coat of paint.</h2>
            <p>
              I believe the best products come from teams that stay close to their users and make decisions out in the
              open. My job is to bring that clarity: to ask the right questions, run the research that answers them, and
              translate what we learn into interfaces that feel effortless. I care about the small details, honest
              states, forgiving flows, and plain language, because that is where trust is built.
            </p>
          </div>
        </section>

        <section className="about-services">
          <div className="content">
            <h2>How I can help</h2>
            <div className="about-services-grid">
              {services.map((service) => (
                <article key={service.title} className="about-service-card">
                  <i className={service.icon} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-approach">
          <div className="content">
            <h2>My approach</h2>
            <div className="about-approach-grid">
              {approach.map((phase) => (
                <div key={phase.step} className="about-approach-step">
                  <span className="about-approach-number">{phase.step}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="content about-cta-inner">
            <h2>Have a product that deserves a better experience?</h2>
            <p>Let us talk about how thoughtful design and research can move it forward.</p>
            <a className="about-btn primary" href="mailto:dklnsm@gmail.com">
              Get in touch
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
