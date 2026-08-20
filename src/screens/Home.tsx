import './styles/Home.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '@/assets';
import config from '@/config';
import articles from '@/data/articles';
import { Footer, SiteNav } from '@/components';

const CLIENT_LOGOS: { key: string; alt: string; className: string }[] = [
  { key: 'logoPersonetics', alt: 'Personetics', className: 'logo-personetics' },
  { key: 'logoJfrog', alt: 'JFrog', className: 'logo-jfrog' },
  { key: 'logoControlup', alt: 'ControlUp', className: 'logo-controlup' },
  { key: 'logoHippoCampus', alt: 'HippoCampus', className: 'logo-hippocampus' },
  { key: 'logoGool', alt: 'GOOL', className: 'logo-gool' },
  { key: 'logoTrustech', alt: 'TRUSTech', className: 'logo-trustech' },
  { key: 'logoAmdocs', alt: 'Amdocs', className: 'logo-amdocs' },
  { key: 'logoTlvMuni', alt: 'Tel Aviv Municipality', className: 'logo-tlv' },
  { key: 'logoSqlink', alt: 'SQLINK', className: 'logo-sqlink' },
  { key: 'logoBeacon', alt: 'Beacon', className: 'logo-beacon' },
  { key: 'logoMarketer', alt: 'Marketer', className: 'logo-marketer' },
  { key: 'logoPractitest', alt: 'PractiTest', className: 'logo-practitest' },
  { key: 'logoBrinks', alt: 'BRINKS', className: 'logo-brinks' },
  { key: 'logoTeamStefansky', alt: 'Team Stefansky', className: 'logo-team' },
  { key: 'logoMyco', alt: 'Myco', className: 'logo-myco' },
];

const TESTIMONIAL_LOGOS: Record<string, string> = {
  'Yarden Strfansky': 'logoTeamStefansky',
  'Barak Ze’evi': 'logoTlvMuni',
  'Ira Pavlova': 'logoHippoCampus',
  'Ariel Zamir': 'logoBeacon',
};

const HELP_ITEMS: { title: string; description: string; icon: string }[] = [
  {
    title: 'Complex workflows that need structure',
    description: 'Roles, states, edge cases, and dependencies become flows teams can build.',
    icon: 'helpWorkflows',
  },
  {
    title: 'AI workflows that save real team time',
    description: 'Practical AI-assisted steps for handoff, design-system upkeep, and fast validation.',
    icon: 'helpAiWorkflows',
  },
  {
    title: 'Competitive research that sharpens the product',
    description: 'Competitor and market patterns become sharper decisions and fewer reinventions.',
    icon: 'helpResearch',
  },
  {
    title: 'Design systems that are easier to maintain',
    description: 'Components, rules, and docs that connect cleanly to implementation.',
    icon: 'helpDesignSystems',
  },
  {
    title: 'From product idea to stronger UX flow',
    description: 'Requirements, constraints, and research shaped into complete, testable flows.',
    icon: 'helpUxFlow',
  },
  {
    title: 'Evidence teams can act on quickly',
    description: 'Tests, interviews, and product data turned into clear next steps.',
    icon: 'helpEvidence',
  },
];

interface HomeProject {
  key: string;
  meta: string;
  title: string;
  description: string;
  tags: string[];
  imageKey: string;
  path?: string;
}

const HOME_PROJECTS: HomeProject[] = [
  {
    key: 'salaries',
    meta: 'Municipal HR system · Complex internal workflow',
    title: 'Salary Exceptions & HR Dashboard',
    description:
      'Paper-based salary calculations reshaped into a reliable digital approval workflow — mapping the process, calculation logic, and stakeholder alignment.',
    tags: ['Complex workflows', 'Calculation logic', 'Internal tools', 'Stakeholder alignment', 'Data-heavy UX'],
    imageKey: 'homeCaseSalaries',
    path: '/salaries',
  },
  {
    key: 'appdx',
    meta: 'B2B SaaS · Technical dashboard',
    title: 'AppDX – Experience Monitoring',
    description:
      'A modular dashboard for monitoring real-user experience in web apps, aligned around clear priorities and a sharper product direction.',
    tags: ['Technical UX', 'Data-heavy UX', 'Dashboard strategy', 'Design sprint', 'Product facilitation'],
    imageKey: 'homeCaseAppdx',
  },
  {
    key: 'marketer',
    meta: 'Startup product · B2B SaaS',
    title: 'Marketer – Internal Marketing Platform',
    description:
      'A marketing-operations platform built end to end, with structure and reusable patterns for a growing product.',
    tags: ['B2B SaaS', 'Startup product', 'Design system from scratch', 'End-to-end ownership'],
    imageKey: 'homeCaseMarketer',
    path: '/marketer',
  },
  {
    key: 'myco',
    meta: 'Mobile apps · Two-sided product',
    title: 'Myco – Mobile Apps for Community Events',
    description:
      'Two connected apps for ticket buyers and event producers, shaped through interviews, competitive research, and product flow design.',
    tags: ['Mobile UX', 'Two-sided product', 'Competitive research', 'User research', 'Flow design'],
    imageKey: 'homeCaseMyco',
    path: '/myco',
  },
  {
    key: 'employees',
    meta: 'Enterprise HR tool · Global onboarding',
    title: 'Employee Onboarding Screen',
    description:
      'A template-based onboarding structure spanning countries, branches, and roles — built to scale and to maintain.',
    tags: ['Complex workflows', 'User interviews', 'Template strategy', 'Stakeholder alignment', 'Enterprise UX'],
    imageKey: 'homeCaseEmployee',
    path: '/employees',
  },
];

const FEATURED_TESTIMONIALS = config.CLIENTS_DATA;

const FEATURED_ARTICLES = articles.slice(0, 3);

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

const TESTIMONIALS_PER_PAGE_QUERY = '(max-width: 900px)';

function useTestimonialsPerPage() {
  const [perPage, setPerPage] = useState(2);

  useEffect(() => {
    const mql = window.matchMedia(TESTIMONIALS_PER_PAGE_QUERY);
    const update = () => setPerPage(mql.matches ? 1 : 2);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return perPage;
}

export default function Home() {
  const rootRef = useReveal();
  const [testimonialPage, setTestimonialPage] = useState(0);
  const perPage = useTestimonialsPerPage();
  const pageCount = Math.max(1, Math.ceil(FEATURED_TESTIMONIALS.length / perPage));
  const clampedPage = Math.min(testimonialPage, pageCount - 1);

  const goToTestimonial = (page: number) => {
    setTestimonialPage((page + pageCount) % pageCount);
  };

  return (
    <>
      <title>Dekel Nissim — Product Designer, UX Strategist & Researcher</title>
      <SiteNav />
      <div className="home-page" ref={rootRef}>
        <main id="content">
          <section className="hp-hero" aria-labelledby="hp-hero-title">
            <div className="hp-content">
              <h1 id="hp-hero-title" className="reveal">
                Turning complex <img className="hp-hero-hedgehog" src={assets.hedgehog} alt="" aria-hidden="true" />
                <br />
                product requirements
                <br />
                <span className="hp-accent">into clear UX solutions</span>
              </h1>
              <p className="hp-hero-subcopy reveal">
                UX research, product thinking, and systems thinking - applied to <strong>complex workflows</strong>,{' '}
                <strong>competitive research</strong>, and <strong>AI-assisted design processes</strong>.
              </p>
              <div className="hp-hero-cta reveal">
                <Link className="hp-btn hp-btn-outline" to="/business-card">
                  Let’s talk
                </Link>
                <a className="hp-text-link" href="#work">
                  Selected work
                </a>
              </div>
            </div>
          </section>

          <section className="hp-clients" aria-label="Clients">
            <p className="hp-clients-label hp-mono">Trusted by teams at</p>
            <div className="hp-marquee" aria-label="Client logos">
              {[false, true].map((isClone) => (
                <div className="hp-marquee-track" aria-hidden={isClone || undefined} key={isClone ? 'clone' : 'main'}>
                  {CLIENT_LOGOS.map((logo) => (
                    <img
                      key={`${isClone ? 'c-' : ''}${logo.key}`}
                      className={logo.className}
                      src={assets[logo.key]}
                      alt={isClone ? '' : logo.alt}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="hp-problems" aria-labelledby="hp-problems-title">
            <div className="hp-content">
              <div className="hp-section-head reveal">
                <span className="hp-mono">Where I Help</span>
                <h2 id="hp-problems-title">Where product teams get more clarity</h2>
              </div>
              <div className="hp-problem-wrap reveal">
                <img className="hp-problem-hedgehog" src={assets.hedgehog} alt="" aria-hidden="true" />
                <div className="hp-problem-grid">
                  {HELP_ITEMS.map((item) => (
                    <article key={item.title}>
                      <img className="hp-problem-icon" src={assets[item.icon]} alt="" aria-hidden="true" />
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="hp-work" id="work" aria-labelledby="hp-work-title">
            <div className="hp-content">
              <div className="hp-section-head reveal">
                <span className="hp-mono">Selected Work</span>
                <h2 id="hp-work-title">Projects that turned complexity into clarity</h2>
              </div>

              <div className="hp-work-list">
                {HOME_PROJECTS.map((project) => {
                  const Visual = (
                    <figure className="hp-project-visual">
                      <img src={assets[project.imageKey]} alt={project.title} loading="lazy" />
                    </figure>
                  );
                  return (
                    <article className="hp-project reveal" key={project.key}>
                      <p className="hp-project-meta">{project.meta}</p>
                      <h3>{project.title}</h3>
                      <p className="hp-case-desc">{project.description}</p>
                      <div className="hp-tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      {project.path ? (
                        <>
                          <Link to={project.path} className="hp-text-link hp-project-cta">
                            View case study
                          </Link>
                          <Link
                            to={project.path}
                            className="hp-project-link"
                            aria-label={`View ${project.title} case study`}
                          >
                            {Visual}
                          </Link>
                        </>
                      ) : (
                        Visual
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="hp-testimonials" aria-labelledby="hp-testimonials-title">
            <div className="hp-content">
              <div className="hp-section-head reveal">
                <span className="hp-mono">Kind Words</span>
                <h2 id="hp-testimonials-title">What people say</h2>
              </div>
              <div className="hp-testimonial-carousel reveal">
                <div className="hp-testimonial-viewport">
                  <div
                    className="hp-testimonial-track"
                    style={{
                      transform: `translateX(calc(${clampedPage} * (-100% - var(--hp-tst-gap))))`,
                    }}
                  >
                    {FEATURED_TESTIMONIALS.map((client) => {
                      const logoKey = TESTIMONIAL_LOGOS[client.name] ?? null;
                      return (
                        <figure className="hp-testimonial" key={client.name}>
                          <blockquote>“{client.text}”</blockquote>
                          <figcaption>
                            <span>
                              <strong>{client.name}</strong>
                              <em>{client.title}</em>
                            </span>
                            {logoKey ? (
                              <span className="hp-tst-logo">
                                <img src={assets[logoKey]} alt={client.company} />
                              </span>
                            ) : (
                              <span className="hp-tst-logo is-text">{client.company}</span>
                            )}
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </div>

                <div className="hp-testimonial-controls">
                  <button
                    type="button"
                    className="hp-testimonial-arrow"
                    onClick={() => goToTestimonial(clampedPage - 1)}
                    aria-label="Previous testimonials"
                  >
                    <span className="uil uil-angle-left" aria-hidden="true" />
                  </button>
                  <div className="hp-testimonial-dots" role="tablist" aria-label="Select testimonials">
                    {Array.from({ length: pageCount }, (_, page) => (
                      <button
                        type="button"
                        key={page}
                        className={`hp-testimonial-dot${page === clampedPage ? ' is-active' : ''}`}
                        onClick={() => goToTestimonial(page)}
                        role="tab"
                        aria-selected={page === clampedPage}
                        aria-label={`Testimonials page ${page + 1} of ${pageCount}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="hp-testimonial-arrow"
                    onClick={() => goToTestimonial(clampedPage + 1)}
                    aria-label="Next testimonials"
                  >
                    <span className="uil uil-angle-right" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="hp-writing" id="writing" aria-labelledby="hp-writing-title">
            <div className="hp-content">
              <div className="hp-section-head reveal">
                <span className="hp-mono">Writing</span>
                <h2 id="hp-writing-title">Writing on UX, AI, fintech, and product decisions</h2>
                <p className="hp-section-sub">Practical thinking from real product questions, not design theory.</p>
              </div>
              <div className="hp-article-cards reveal">
                {FEATURED_ARTICLES.map((article) => {
                  const content = article.en;
                  return (
                    <Link className="hp-article-card" to={`/articles/${article.slug}`} key={article.slug}>
                      <div className="hp-article-thumb">
                        {assets[article.image] ? (
                          <img className="cover" src={assets[article.image]} alt={content.title} loading="lazy" />
                        ) : null}
                        {article.tags[0] ? <span className="cat">{article.tags[0]}</span> : null}
                      </div>
                      <div className="hp-article-body">
                        <p className="hp-art-meta">Article · {content.readingTime}</p>
                        <h3>{content.title}</h3>
                        <span className="hp-article-read">
                          Read article <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="hp-writing-more">
                <Link className="hp-text-link" to="/articles">
                  View all articles
                </Link>
              </div>
            </div>
          </section>

          <section className="hp-final-cta" id="contact" aria-labelledby="hp-cta-title">
            <div className="hp-content">
              <span className="hp-mono">Contact</span>
              <h2 id="hp-cta-title">Have a complex product decision to move forward?</h2>
              <Link className="hp-btn" to="/business-card">
                Get in touch
              </Link>
              <p className="hp-footer-note">Dekel Nissim — UX Research · Product Strategy</p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
