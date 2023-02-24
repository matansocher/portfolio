import '../styles/Home.scss';
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
            <HomeProject
              name="marketer"
              header="Marketer"
              text="As the first Product Designer, I created Design system for a new startup for Marketing management system."
              sideImage={assets.homeMarketerImage}
            />
            <HomeProject
              name="myco"
              header="Myco"
              text="As the first Product Designer, I created Design system for a new startup for Marketing management system."
              sideImage={assets.homeMycoImage}
            />
            <HomeProject
              name="salaries"
              header="Salary Additions"
              sideImage={assets.homeSalariesImage}
            />
            <HomeProject
              name="employees"
              header="Employee Onboarding page"
              sideImage={assets.homeEmployeesImage}
            />
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
