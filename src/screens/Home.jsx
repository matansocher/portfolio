import './styles/Home.scss';
import { Link } from 'react-router-dom';
import assets from '../assets';
import config from '../config';
import { Client, Logos, HomeProject, Navbar } from '../components';

export default function Home() {
  return (
    <>
      <Navbar isWhiteText={true} />
      <div className="home">

        <section className="home-top">
          <div className="container">
            <h1 className="first">Hi 👋<br/>I’m Dekel</h1>
            <h2 className="secondary">Product Designer & UX Researcher</h2>
          </div>
        </section>

        <section className="home-icons">
          <div className="content">
            <h4>My Clients</h4>
            <Logos/>
          </div>
        </section>

        <section className="home-projects">
          <div className="content">
            <h4>My Projects</h4>

            <Link to="salaries">
              <HomeProject name="salaries" header="Salary Additions" sideImage={assets.salariesMainScreenAndUI1}
               text="An end-to-end internal system for automating salary calculations and approvals. The solution and custom algorithm I created resulted in high success rates"
              />
            </Link>

            <Link to="marketer">
              <HomeProject name="marketer" header="Marketer" sideImage={assets.homeMarketerImage}
                text="A Design system I created for a new startup for Marketing management system, as the first Product Designer"
              />
            </Link>

            <Link to="myco">
              <HomeProject name="myco" header="Myco" sideImage={assets.homeMycoImage}
                text="A Marketing management system & Producers Interface I created"
              />
            </Link>

            <Link to="employees">
              <HomeProject name="employees" header="Employee Onboarding Page" sideImage={assets.homeEmployeesImage} darkText={true} backgroundImage={assets.homeEmployeesBackground} />
            </Link>
          </div>
        </section>

        <section className="home-clients">
          <div className="content">
            <h4>What clients say</h4>
            {config.CLIENTS_DATA.map(clientData => {
                return <Client key={clientData.name} clientData={clientData} />
            })}
          </div>
        </section>

      </div>
    </>
  );
}
