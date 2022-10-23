import './SalariesWireframes.scss';
import assets from '../../../../assets';

export default function SalariesWireframes() {
  return (
    <section className="wireframes-container">
      <div className="content wireframes-section">
        <h3>Wireframes</h3>
        <div className="wireframes-section-box">
          <div className="wireframes-section-box-image">
            <img src={assets.salariesWireframes1} alt="salaries app wireframes" />
          </div>
          <div className="wireframes-section-box-image">
            <img src={assets.salariesWireframes2} alt="salaries app wireframes" />
          </div>
          <div className="wireframes-section-box-image">
            <img src={assets.salariesWireframes3} alt="salaries app wireframes" />
          </div>
        </div>
      </div>
    </section>
  );
}
