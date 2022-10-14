import './HomeMyco.scss';
import { homeMyco } from '../../../../assets/home';

export default function HomeMyco() {
  return (
    <section className="section-container myco-container">
      <div className="content section-content">
        <div className="section-content-left">
          <h2>MYCO</h2>
          <p>Events management App</p>
          <div className="tags">
            <span className="tag">UX UI</span>
          </div>
        </div>
        <div className="section-content-right">
          <img src={homeMyco} alt="screen example" />
        </div>
      </div>
    </section>
  );
}
