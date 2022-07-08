import './HomeMunicipal.scss';
import homeMunicipal from '../../../assets/home/home-municipal.png';

function MunicipalFlow() {
  return (
    <section className="section-container municipal-container">
      <div className="content section-content">
        <div className="section-content-left">
          <h2>Salary additions</h2>
          <p>Calculation & management of salary additions</p>
        </div>
        <div className="section-content-right">
          <img src={homeMunicipal} />
        </div>
      </div>
    </section>
  );
}

export default MunicipalFlow;
