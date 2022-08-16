import './HomeMarketist.scss';
import { homeMarketist } from '../../../assets/home';

function SalariesFlow() {
  return (
    <section className="section-container marketist-container">
      <div className="content section-content">
        <div className="section-content-left">
          <h2>Marketist</h2>
          <p>Internal marketing management system</p>
          <p>Coming Soon...</p>
        </div>
        <div className="section-content-right">
          <img src={homeMarketist} alt="screen example" />
        </div>
      </div>
    </section>
  );
}

export default SalariesFlow;
