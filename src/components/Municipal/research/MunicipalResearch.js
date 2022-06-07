import './MunicipalResearch.scss';
import municipalResearch1 from '../../../assets/municipal/municipal-research-1.png';
import municipalResearch2 from '../../../assets/municipal/municipal-research-2.png';
import municipalResearch3 from '../../../assets/municipal/municipal-research-3.png';

function MunicipalResearch() {
  return (
    <section className="research-section-container">
      <div className="content research-section">
        <h3>Project Research</h3>
        <p>I had to fully understand the existing process and additions calculations & approval process. 
        For that, I conducted several interviews with HR manager, as well as interviewed some of the HR coordinators. 
        I also preformed observations while they we’re working, in order to understand their work flow.</p>
        <div className="research-section-bottom">
          <img src={municipalResearch1} />
          <img src={municipalResearch2} />
          <img src={municipalResearch3} />
        </div>
      </div>
    </section>
  );
}

export default MunicipalResearch;
