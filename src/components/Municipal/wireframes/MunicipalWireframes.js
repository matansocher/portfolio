import './MunicipalWireframes.scss';
import municipalWireframes1 from '../../../assets/municipal/municipal-wireframes-1.png';
import municipalWireframes2 from '../../../assets/municipal/municipal-wireframes-2.png';
import municipalWireframes3 from '../../../assets/municipal/municipal-wireframes-3.png';

function MunicipalWireframes() {
  return (
    <section className="wireframes-section-container">
      <div className="content wireframes-section">
        <h3>Wireframes</h3>
        <div className="wireframes-section-box">
          <div className="wireframes-section-box-image"><img src={municipalWireframes1} /></div>
          <div className="wireframes-section-box-image"><img src={municipalWireframes2} /></div>
          <div className="wireframes-section-box-image"><img src={municipalWireframes3} /></div>
        </div>
      </div>
    </section>
  );
}

export default MunicipalWireframes;
