import './MycoProducers.scss';
import assets from '../../../../assets';

export default function MycoProducers() {
  return (
    <section className="producers-container">
      <div className="content producers-section">
        <h2>Producers App</h2>
        <div className="producers-section-part">
          <div className="producers-section-part-item">
            {/* <h4>Event Page</h4>
            <img src={assets.mycoProducers1} alt="screen example" /> */}
          </div>
          <div className="producers-section-part-item">
            <h4>Event Page</h4>
            <img src={assets.mycoProducers1} alt="screen example" />
          </div>
          <div className="producers-section-part-item">
            <h4>Events Page</h4>
            <img src={assets.mycoProducers2} alt="screen example" />
          </div>
        </div>
        <div className="producers-section-part">
          <div className="producers-section-part-item">
            <h4>Event Page</h4>
            <img src={assets.mycoProducers3} alt="screen example" />
          </div>
          <div className="producers-section-part-item">
            <h4>Sales Sources</h4>
            <img src={assets.mycoProducers4} alt="screen example" />
          </div>
          <div className="producers-section-part-item">
            <h4>Vouchers</h4>
            <img src={assets.mycoProducers5} alt="screen example" />
          </div>
        </div>
      </div>
    </section>
  );
}
