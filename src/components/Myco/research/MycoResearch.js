import './MycoResearch.scss';
import mycoResearch1 from '../../../assets/myco/myco-research-1.png';
import mycoResearch2 from '../../../assets/myco/myco-research-2.png';
import mycoResearch3 from '../../../assets/myco/myco-research-3.png';
import mycoResearch4 from '../../../assets/myco/myco-research-4.png';
import mycoResearch5 from '../../../assets/myco/myco-research-5.png';

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
            <p>I had to fully understand the existing process and additions calculations & approval process. For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators. I also preformed observations while they we’re working, in order to understand their work flow.</p>
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
