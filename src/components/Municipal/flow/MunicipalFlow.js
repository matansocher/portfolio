import './MunicipalFlow.scss';
import municipalFlow1 from '../../../assets/municipal/municipal-flow-1.png';
import municipalFlow2 from '../../../assets/municipal/municipal-flow-2.png';
import municipalFlow3 from '../../../assets/municipal/municipal-flow-3.png';
import municipalFlow4 from '../../../assets/municipal/municipal-flow-4.png';
import municipalFlow5 from '../../../assets/municipal/municipal-flow-5.png';
import municipalFlow6 from '../../../assets/municipal/municipal-flow-6.png';
import municipalFlow7 from '../../../assets/municipal/municipal-flow-7.png';

function MunicipalFlow() {
  return (
    <section className="flow-container">
      <div className="content flow-section">
        <div className="flow-section-one">
          <div className="flow-section-one-left">
            <h2>General Flow & <br />Supporting end cases</h2>
          </div>
          <div className="flow-section-one-right">
            <p>We aimed for the manual approval process to be as fluent as possible, in order to improve the existing process and shorten the overall time of approval.</p>
            <p>For that purpose, we showed only what is necessary (requires approval), and enphasized the essential (not enough sick days accumulated, for example)</p>
          </div>
        </div>
        <div className="flow-section-two">
          <div className="flow-section-two-left">
            <h3>Business logic & Calculations</h3>
            <p>The business logic & salary additions calculations were documented in over 30 flow charts I created and delivered to the developer, and later on tested before moving to production.</p>
            <p>In the screenshots here, you can see the list of flow charts assembling together the calculation algorithm</p>
            <p>You can also see two examples of these flow charts - the root flow charts for basic calculations.</p>
          </div>
          <div className="flow-section-two-right">
            <img src={municipalFlow1} />
          </div>
        </div>
        <div className="flow-section-three">
          <div className="flow-section-three-left">
            <img src={municipalFlow2} />
          </div>
          <div className="flow-section-three-right">
            <img src={municipalFlow3} />
          </div>
        </div>
        <div className="flow-section-four">
          <h3>General Flow</h3>
          <div className="flow-section-four-content">
            <div className="flow-section-four-content-left">
              <h4>DASHBOARD</h4>
              <p>Each HR Coordinator ia is charge of 3-4 Sanitation stations, and has to check & approve their additions.<br />
              Here, each of them can see how many cards she has to attend, click on the column in order to see the entire unit???s attendace cards.
              She can also use the search section to find a specific employee???s card.</p>
              <p>The Coordinators, as well as HR Manager, can track their progress in a glance, since as they progress the graph turns slowly from blue (status ???unchecked???) to green (???approved???).</p>
            </div>
            <div className="flow-section-four-content-right">
              <img src={municipalFlow4} />
            </div>
          </div>
          <h4>DIGITAL ATTENDANCE CARD</h4>
          <p className="last-p">Based on the research (User interviews & Observations) I decide on the following layout:</p>
        </div>
        <div className="flow-section-five">
          <img src={municipalFlow5} />
          <div className="flow-section-five-content">
            <p>The structure was based on the F shape scanning pattern (turning over in hebrew - Shanpe, in order to support the scanning flow with the basic information:</p>
            <img src={municipalFlow6} />
            <p>Since 60-70% of cards consist of common additions, this layout allows the Coordinator to approve cards quite fast (just as we don???t go and check a calculator???s result).</p>
            <p>For the more complex cards, they can press on each days and see the detailed calculation in a pop up:</p>
            <img src={municipalFlow7} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MunicipalFlow;
