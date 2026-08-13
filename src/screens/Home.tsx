import './styles/Home.scss';
import { Link } from 'react-router-dom';
import assets from '../assets';
import config from '../config';
import { Client, Logos, SiteNav } from '../components';
import './styles/Projects.scss';

export default function Home() {
  return (
    <>
      <SiteNav transparent={true} />
      <div className="home">
        <section className="home-top">
          <div className="container">
            <h1 className="first">
              Hi 👋
              <br />
              I’m Dekel
            </h1>
            <h2 className="secondary">Product Designer & UX Researcher</h2>
          </div>
        </section>

        <section className="home-icons">
          <div className="content">
            <h4>My Clients</h4>
            <Logos />
          </div>
        </section>

        <section className="home-projects">
          <div className="content">
            <h4>My Projects</h4>

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

        <section className="home-clients">
          <div className="content">
            <h4>What clients say</h4>
            {config.CLIENTS_DATA.map((clientData) => {
              return <Client key={clientData.name} clientData={clientData} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}
