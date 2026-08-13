import './styles/Home.scss';
import { Link } from 'react-router-dom';
import assets from '../assets';
import config from '../config';
import { Logos, SiteNav } from '../components';

const FEATURE_TAGS = ['UX for complex workflows', 'Data dashboards', 'Form logic', 'Stakeholder collaboration'];
const TESTIMONIAL_LOGOS: Record<string, string> = {
  'Yarden Strfansky': 'logoTeamStefansky',
  'Barak Ze’evi': 'logoTlvMuni',
  'Ira Pavlova': 'logoHippoCampus',
  'Ariel Zamir': 'logoBeacon',
};
const SECONDARY_CASES = [
  {
    key: 'marketer',
    title: 'AppDX — Experience Monitoring',
    tag: 'Web Monitoring / B2B SaaS',
    tags: ['UX for technical users', 'Widget-based dashboards', 'Research-led design', 'Data visualization'],
    description:
      'Defined and designed a modular dashboard for monitoring real-user experience in web apps. Led a design sprint and validated the concept with internal experts.',
    imageKey: 'homeMarketerImage',
    path: '/marketer',
  },
  {
    key: 'myco',
    title: 'B2B New Homepage',
    tag: 'Web Monitoring / B2B SaaS',
    tags: ['UX for technical users', 'Widget-based dashboards', 'Research-led design', 'Data visualization'],
    description:
      'Defined and designed a modular dashboard for monitoring real-user experience in web apps. Led a design sprint and validated the concept with internal experts.',
    imageKey: 'homeMycoImage',
    path: '/myco',
  },
  {
    key: 'employees',
    title: 'Employee Onboarding Screen',
    tag: 'Internal HR / B2B SaaS',
    tags: ['UX for technical users', 'Widget-based dashboards', 'Research-led design', 'Data visualization'],
    description:
      'Designed a cross-functional onboarding flow across HR, managers, and new hires, creating a clearer and more welcoming onboarding experience.',
    imageKey: 'homeEmployeesImage',
    path: '/employees',
  },
];

export default function Home() {
  const featuredProject = config.PROJECTS[0];

  return (
    <>
      <SiteNav transparent={true} />
      <div className="home">
        <div className="home-shell">
          <section className="home-hero">
            <div className="home-hero__inner">
              <h1>
                Hi, I’m
                <span> Dekel Nissim</span>
              </h1>
              <p className="home-hero__subtitle">
                I specialize in UX for complex systems — from internal tools to dashboards and mobile platforms.
              </p>
              <p className="home-hero__note">This is a curated selection of projects. Some include full case studies.</p>
            </div>
          </section>

          <div className="home-divider" />

          <section className="home-logos">
            <div className="home-section-label">Some Clients &amp; Partners</div>
            <Logos />
          </section>

          <section className="home-featured-case">
            <div className="case-meta">{`Internal HR System / ${featuredProject.title}`}</div>
            <h2>{featuredProject.title}</h2>
            <div className="case-tags">
              {FEATURE_TAGS.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p>{featuredProject.summary}</p>
            <Link to={featuredProject.path} className="case-link">
              View full case study
            </Link>
            <div className="case-visual">
              <img src={assets[featuredProject.imageKey]} alt={featuredProject.title} />
            </div>
          </section>

          <section className="home-secondary-cases">
            {SECONDARY_CASES.map((project) => (
              <article key={project.key} className="secondary-case">
                <div className="secondary-case__content">
                  <div className="secondary-case__meta">{project.tag}</div>
                  <h3>{project.title}</h3>
                  <div className="case-tags case-tags--small">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p>{project.description}</p>
                  <Link to={project.path} className="case-link">
                    View case study
                  </Link>
                </div>
                <div className="secondary-case__visual">
                  <img src={assets[project.imageKey]} alt={project.title} />
                </div>
              </article>
            ))}
          </section>

          <section className="home-testimonials">
            <h2>What People Say</h2>
            <div className="home-testimonials-grid">
              {config.CLIENTS_DATA.map((item) => {
                const logoKey = TESTIMONIAL_LOGOS[item.name] ?? null;
                return (
                  <article key={item.name} className="testimonial-card">
                    <p className="testimonial-card__quote">“{item.text}”</p>
                    <div className="testimonial-card__person">
                      <div className="testimonial-card__name-wrap">
                        <span className="testimonial-card__name">{item.name}</span>
                        <span className="testimonial-card__meta">{item.title}</span>
                      </div>
                      {logoKey ? (
                        <img className="testimonial-card__logo" src={assets[logoKey]} alt={item.company} />
                      ) : (
                        <span className="testimonial-card__brand">{item.company}</span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
