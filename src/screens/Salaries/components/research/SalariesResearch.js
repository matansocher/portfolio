import './SalariesResearch.scss';
import assets from '../../../../assets';

export default function salariesResearch() {
  return (
    <section className="salaries-research-container">
      <div className="content salaries-research-section">
        <h3>Project Research</h3>
        <p>I had to fully understand the existing process and additions calculations & approval process.<br></br>For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators.<br></br>I also preformed observations while they we’re working, in order to understand their work flow.</p>
        <div className="salaries-research-section-bottom">
          <img alt="hours calculations document" src={assets.salariesResearch1} />
          <img alt="hours calculations document" src={assets.salariesResearch2} />
          <img alt="hours calculations document" src={assets.salariesResearch3} />
        </div>
      </div>
    </section>
  );
}
