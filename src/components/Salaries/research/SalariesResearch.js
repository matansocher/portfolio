import './SalariesResearch.scss';
import { salariesResearch1, salariesResearch2, salariesResearch3 } from '../../../assets/salaries';

function salariesResearch() {
  return (
    <section className="research-container">
      <div className="content research-section">
        <h3>Project Research</h3>
        <p>I had to fully understand the existing process and additions calculations & approval process. 
        For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators. 
        I also preformed observations while they we’re working, in order to understand their work flow.</p>
        <div className="research-section-bottom">
          <img alt="" src={salariesResearch1} alt="reasearch documents" />
          <img alt="" src={salariesResearch2} alt="reasearch documents" />
          {/* <img alt="" src={salariesResearch3} alt="reasearch documents" /> */}
        </div>
      </div>
    </section>
  );
}

export default salariesResearch;
