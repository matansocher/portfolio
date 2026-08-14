import './styles/Home.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '@/assets';
import config from '@/config';
import { Logos, SiteNav } from '@/components';

const TESTIMONIAL_LOGOS: Record<string, string> = {
  'Yarden Strfansky': 'logoTeamStefansky',
  'Barak Ze’evi': 'logoTlvMuni',
  'Ira Pavlova': 'logoHippoCampus',
  'Ariel Zamir': 'logoBeacon',
};

const TESTIMONIALS_PER_SLIDE = 2;
const TESTIMONIAL_SLIDES = Array.from(
  { length: Math.ceil(config.CLIENTS_DATA.length / TESTIMONIALS_PER_SLIDE) },
  (_, slide) =>
    config.CLIENTS_DATA.slice(slide * TESTIMONIALS_PER_SLIDE, slide * TESTIMONIALS_PER_SLIDE + TESTIMONIALS_PER_SLIDE),
);

interface HomeCase {
  key: string;
  eyebrow: string;
  title: string;
  tags: string[];
  description: string;
  imageKey: string;
  path?: string;
}

const HOME_CASES: HomeCase[] = [
  {
    key: 'salaries',
    eyebrow: 'Internal HR System / B2B',
    title: 'Salary Exceptions & HR Dashboard',
    tags: [
      'UX for complex workflows',
      'Data dashboards',
      'Form logic',
      'Stakeholder collaboration',
      'Data visualization',
    ],
    description:
      'Led UX from start to finish – research, logic definition, and interface design – for a digital system handling salary exceptions in a large municipal HR department. Built the calculation logic and worked closely with developers.',
    imageKey: 'homeCaseSalaries',
    path: '/salaries',
  },
  {
    key: 'appdx',
    eyebrow: 'Web Monitoring Dashboard / B2B SaaS',
    title: 'AppDX – Experience Monitoring',
    tags: ['UX for technical users', 'Widget-based dashboards', 'Research-led design', 'Data visualization'],
    description:
      'Defined and designed a modular dashboard for monitoring real-user experience in web apps. Led a design sprint and validated the concept with internal experts.',
    imageKey: 'homeCaseAppdx',
  },
  {
    key: 'b2b-homepage',
    eyebrow: 'Web Monitoring Dashboard / B2B SaaS',
    title: 'B2B New Homepage',
    tags: [
      'UX for technical users',
      'Widget-based dashboards',
      'Research-led design',
      'Data visualization',
      'Design sprint',
    ],
    description:
      'Defined and designed a modular dashboard for monitoring real-user experience in web apps. Led a design sprint and validated the concept with internal experts.',
    imageKey: 'homeCaseEmployee',
  },
  {
    key: 'employees',
    eyebrow: 'Internal HR Tool / B2B SaaS',
    title: 'Employee Onboarding Screen',
    tags: [
      'UX for technical users',
      'Widget-based dashboards',
      'Research-led design',
      'Data visualization',
      'Design sprint',
    ],
    description:
      'Designed a screen for onboarding hundreds of employees. Conducted interviews with HR staff from global offices. Balanced automation with flexibility.',
    imageKey: 'homeCaseB2bHp',
    path: '/employees',
  },
  {
    key: 'myco',
    eyebrow: 'Mobile App / B2C',
    title: 'Myco – Mobile Apps for Community Events',
    tags: ['Mobile UX', 'UI', 'B2C', 'Data visualization', 'User research', 'Competitor research'],
    description:
      'Designed two mobile apps – one for ticket purchasing and one for event producers. Conducted user interviews and competitive analysis.',
    imageKey: 'homeCaseMyco',
    path: '/myco',
  },
  {
    key: 'reports',
    eyebrow: 'Reporting System / B2B Internal Tool',
    title: 'Automated Reports',
    tags: ['Mobile UX', 'UI', 'B2C', 'Data visualization', 'User research', 'Competitor research'],
    description:
      'Designed two mobile apps – one for ticket purchasing and one for event producers. Conducted user interviews and competitive analysis.',
    imageKey: 'homeCaseReports',
  },
  {
    key: 'marketer',
    eyebrow: 'Startup Tool / B2B',
    title: 'Marketer – Internal Marketing Platform',
    tags: ['UI design', 'Design systems', 'Accessibility', 'Visual hierarchy'],
    description:
      'Sole designer in an early-stage startup. Designed the internal platform for marketing and campaign tracking. Delivered both UX and UI, and created a basic design system.',
    imageKey: 'homeCaseMarketer',
    path: '/marketer',
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = TESTIMONIAL_SLIDES.length;

  const goToSlide = (index: number) => {
    setActiveSlide((index + slideCount) % slideCount);
  };

  return (
    <>
      <SiteNav />
      <div className="home">
        <div className="home-shell">
          <section className="home-hero home-section">
            <div className="home-hero__inner">
              <h1>
                Hi, I'm
                <span> Dekel Nissim</span>
              </h1>
              <p className="home-hero__subtitle">
                I specialize in UX for complex systems — from internal tools to dashboards and mobile platforms.
              </p>
              <p className="home-hero__note">
                This is a curated selection of projects. Some include full case studies.
              </p>
            </div>
          </section>

          <div className="home-divider" />

          <section className="home-logos">
            <div className="home-section-label home-section">Some Clients &amp; Partners</div>
            <div className="home-logos__row">
              <Logos />
            </div>
          </section>

          <section className="home-cases home-section">
            {HOME_CASES.map((project) => (
              <article key={project.key} className="home-case">
                <div className="home-case__content">
                  <div className="home-case__meta">{project.eyebrow}</div>
                  <h2>{project.title}</h2>
                  <div className="case-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p>{project.description}</p>
                  {project.path ? (
                    <Link to={project.path} className="case-link">
                      View case study
                    </Link>
                  ) : null}
                </div>
                <div className="home-case__visual">
                  <img src={assets[project.imageKey]} alt={project.title} />
                </div>
              </article>
            ))}
          </section>

          <section className="home-testimonials home-section">
            <h2>What People Say</h2>
            <div className="testimonials-carousel">
              <div className="testimonials-carousel__viewport">
                <div
                  className="testimonials-carousel__track"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {TESTIMONIAL_SLIDES.map((slide, slideIndex) => (
                    <div
                      className="testimonials-carousel__slide"
                      key={slideIndex}
                      aria-hidden={slideIndex !== activeSlide}
                    >
                      {slide.map((item) => {
                        const logoKey = TESTIMONIAL_LOGOS[item.name] ?? null;
                        return (
                          <article key={item.name} className="testimonial-card">
                            <p className="testimonial-card__quote">"{item.text}"</p>
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
                  ))}
                </div>
              </div>

              {slideCount > 1 ? (
                <div className="testimonials-carousel__controls">
                  <button
                    type="button"
                    className="testimonials-carousel__arrow"
                    onClick={() => goToSlide(activeSlide - 1)}
                    aria-label="Previous testimonials"
                  >
                    <i className={`uil uil-${config.ICONS_MAP.ARROW_LEFT}`} />
                  </button>
                  <div className="testimonials-carousel__dots">
                    {TESTIMONIAL_SLIDES.map((_, slideIndex) => (
                      <button
                        type="button"
                        key={slideIndex}
                        className={`testimonials-carousel__dot${slideIndex === activeSlide ? ' is-active' : ''}`}
                        onClick={() => goToSlide(slideIndex)}
                        aria-label={`Go to testimonials ${slideIndex + 1}`}
                        aria-current={slideIndex === activeSlide}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="testimonials-carousel__arrow"
                    onClick={() => goToSlide(activeSlide + 1)}
                    aria-label="Next testimonials"
                  >
                    <i className={`uil uil-${config.ICONS_MAP.ARROW_RIGHT}`} />
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
