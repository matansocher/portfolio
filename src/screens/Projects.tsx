import './styles/Projects.scss';
import { Link } from 'react-router-dom';
import assets from '../assets';
import config from '../config';
import { SiteNav } from '../components';

export default function Projects() {
  return (
    <>
      <SiteNav />
      <main className="projects page">
        <section className="projects-header">
          <div className="container">
            <p className="projects-eyebrow">Selected work</p>
            <h1>Projects</h1>
            <p className="projects-lead">
              A selection of products I have designed end to end, from research and strategy to polished, shipped
              interfaces. Each one started with a real problem and a team that wanted to get it right.
            </p>
          </div>
        </section>

        <section className="projects-grid-section">
          <div className="content">
            <div className="projects-grid">
              {config.PROJECTS.map((project) => (
                <Link key={project.key} to={project.path} className="projects-card">
                  <div className="projects-card-image">
                    <img src={assets[project.imageKey]} alt={project.title} />
                  </div>
                  <div className="projects-card-body">
                    <h2>{project.title}</h2>
                    <p>{project.summary}</p>
                    <span className="projects-card-link">
                      View case study
                      <i className="uil uil-arrow-right" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
