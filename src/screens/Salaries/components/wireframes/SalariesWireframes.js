import './SalariesWireframes.scss';
import { salariesWireframes1, salariesWireframes2, salariesWireframes3 } from '../../../../assets/salaries';

function SalariesWireframes() {
  return (
    <section className="wireframes-container">
      <div className="content wireframes-section">
        <h3>Wireframes</h3>
        <div className="wireframes-section-box">
          <div className="wireframes-section-box-image">
            <img src={salariesWireframes1} alt="salaries app wireframes" />
          </div>
          <div className="wireframes-section-box-image">
            <img src={salariesWireframes2} alt="salaries app wireframes" />
          </div>
          <div className="wireframes-section-box-image">
            <img src={salariesWireframes3} alt="salaries app wireframes" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SalariesWireframes;
