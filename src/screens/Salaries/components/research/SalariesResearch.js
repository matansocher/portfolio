import './SalariesResearch.scss';
import { salariesResearch1, salariesResearch2 } from '../../../../assets/salaries';

export default function salariesResearch() {
  return (
    <section className="research-container">
      <div className="content research-section">
        <h3>Project Research</h3>
        <p>I had to fully understand the existing process and additions calculations & approval process. 
        For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators. 
        I also preformed observations while they we’re working, in order to understand their work flow.</p>
        <div className="research-section-bottom">
          <img alt="hours calculations document" src={salariesResearch1} />
          <img alt="hours calculations document" src={salariesResearch2} />
        </div>
      </div>
    </section>
  );
}
