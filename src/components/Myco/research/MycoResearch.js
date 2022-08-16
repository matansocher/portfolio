import './MycoResearch.scss';
import { mycoResearch1, mycoResearch2, mycoResearch3, mycoResearch4, mycoResearch5 } from '../../../assets/myco';

function MycoResearch() {
  return (
    <section className="research-container">
      <div className="content research-section">
        <div className="research-section-top">
          <div className="research-section-top-left">
            <h3>Research & Benchmarking</h3>
            <p>The best solution was to report hours through the existing Sanitation tasks management system. Employees preforms 1-3 tasks each day, which are already managed in this system by work manager. We added fields to the screen, allowing to report, enabling to report start & end time for each task.</p>
          </div>
          <div className="research-section-top-right">
            <div className="research-section-top-right-item">
              <img src={mycoResearch1} alt="screen example" />
              <img src={mycoResearch2} alt="screen example" />
            </div>
            <div className="research-section-top-right-item">
              <img src={mycoResearch3} alt="screen example" />
            </div>
            <div className="research-section-top-right-item">
              <img src={mycoResearch4} alt="screen example" />
            </div>
          </div>
        </div>
        <div className="research-section-middle">
          <div className="research-section-middle-left">
            <h3>Wireframes & User Flows</h3>
          </div>
          <div className="research-section-middle-right">
            <p>In order to understand the current process and try to come up with improvements, I conducted interviews and talked to two experienced users. I tried to discover their challenges, pain points and goals to acheive.<br />From these insights, I created user flows designed to better support the users needs. </p>
          </div>
        </div>
        <div className="research-section-bottom">
          <img src={mycoResearch5} alt="flow chart" />
        </div>
      </div>
    </section>
  );
}

export default MycoResearch;
