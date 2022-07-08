import './HomeAtrea.scss';
import homeAtrea from '../../../assets/home/home-atrea.png';

function MunicipalFlow() {
  return (
    <section className="section-container atrea-container">
      <div className="content section-content">
        <div className="section-content-left">
          <h2>Atrea</h2>
          <p>Internal Marketing management system</p>
          <p>Coming Soon...</p>
        </div>
        <div className="section-content-right">
          <img src={homeAtrea} alt="screen example" />
        </div>
      </div>
    </section>
  );
}

export default MunicipalFlow;
