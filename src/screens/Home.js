import '../styles/Home.scss';
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
            <h1>Hi. I’m Dekel<br />UXUI Designer</h1>
          </div>
        </section>

        <section className="home-icons">
          <Logos />
        </section>

        <section className="home-projects">
          <div className="content">
            <h4>My Projects</h4>

            <Link to="marketer">
              <HomeProject name="marketer" header="Marketer" sideImage={assets.homeMarketerImage}
                text="As the first Product Designer, I created Design system for a new startup for Marketing management system."
              />
            </Link>

            <Link to="myco">
              <HomeProject name="myco" header="Myco" sideImage={assets.homeMycoImage}
                text="As the first Product Designer, I created Design system for a new startup for Marketing management system."
              />
            </Link>

            <Link to="salaries">
              <HomeProject name="salaries" header="Salary Additions" sideImage={assets.homeSalariesImage} />
            </Link>

            <Link to="employees">
              <HomeProject name="employees" header="Employee Onboarding page" sideImage={assets.homeEmployeesImage} />
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
