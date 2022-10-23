import './HomeSalaries.scss';
import { Link } from 'react-router-dom';
import assets from '../../../../assets';

export default function HomeSalaries() {
  return (
    <section className="section-container salaries-container">
      <Link to='/salaries' style={{ textDecoration: 'none' }} className="section-content">
        <div className="section-content-left">
          <h2>Salary Additions</h2>
          <p>Calculation & management of salary additions</p>
          <div className="tags">
            <span className="tag">UX UI</span>
          </div>
        </div>
        <div className="section-content-right">
          <img src={assets.homeSalaries} alt="salary additions app screen" />
        </div>
      </Link>
    </section>
  );
}
