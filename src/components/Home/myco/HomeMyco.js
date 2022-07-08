import './HomeMyco.scss';
import homeMyco from '../../../assets/home/home-myco.png';

function MunicipalFlow() {
  return (
    <section className="section-container myco-container">
      <div className="content section-content">
        <div className="section-content-left">
          <h2>MYCO</h2>
          <p>Events Management App</p>
        </div>
        <div className="section-content-right">
          <img src={homeMyco} alt="screen example" />
        </div>
      </div>
    </section>
  );
}

export default MunicipalFlow;
