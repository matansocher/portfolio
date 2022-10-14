import './MycoProducers.scss';
import { mycoProducers1, mycoProducers2, mycoProducers3, mycoProducers4 } from '../../../../assets/myco';

export default function MycoProducers() {
  return (
    <section className="producers-container">
      <div className="content producers-section">
        <div className="producers-section-part">
          <h2>Producers App</h2>
          <div className="producers-section-part-item">
            <h4>Events Page</h4>
            <img src={mycoProducers1} alt="screen example" />
          </div>
        </div>
        <div className="producers-section-part">
          <div className="producers-section-part-item">
            <h4>Events Page</h4>
            <img src={mycoProducers2} alt="screen example" />
          </div>
          <div className="producers-section-part-item">
            <h4>Sales Sources</h4>
            <img src={mycoProducers3} alt="screen example" />
          </div>
          <div className="producers-section-part-item">
            <h4>Vouchers</h4>
            <img src={mycoProducers4} alt="screen example" />
          </div>
        </div>
      </div>
    </section>
  );
}
