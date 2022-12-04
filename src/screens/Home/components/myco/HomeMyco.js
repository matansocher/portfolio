import './HomeMyco.scss';
import { Link } from 'react-router-dom';
import assets from '../../../../assets';

export default function HomeMyco() {
  return (
    <section className="section-container myco-container">
      <div className="section-content">
        <div className="section-content-left">
          <h2>MYCO</h2>
          {/* <p>Events management App</p> */}
          <p>Redesign of a Ticket sales platform + Events management platform for producers (new design).</p>
          <div className="tags">
            <span className="tag">UX research</span>
            <span className="tag">UI design</span>
          </div>
          <Link to='/myco'>Take a look</Link>
        </div>
        <div className="section-content-right">
          <img className="regular" src={assets.homeMyco} alt="screen example" />
          <img className="mobile" src={assets.homeMycoMobile} alt="screen example" />
        </div>
      </div>
    </section>
  );
}
