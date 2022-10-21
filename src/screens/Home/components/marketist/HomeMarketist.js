import './HomeMarketist.scss';
import { Link } from 'react-router-dom';
import { homeMarketist } from '../../../../assets/home';

export default function HomeMarketist() {
  return (
    <section className="section-container marketist-container">
      <Link to='/marketist' style={{ textDecoration: 'none' }} className="section-content">
        <div className="section-content-left">
          <h2>Marketist</h2>
          <p>Internal marketing management system</p>
          <div className="tags">
            <span className="tag">UI</span>
          </div>
        </div>
        <div className="section-content-right">
          <img src={homeMarketist} alt="screen example" />
        </div>
        </Link>
    </section>
  );
}
