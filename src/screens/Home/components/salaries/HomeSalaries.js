import './HomeSalaries.scss';
import { homeSalaries } from '../../../../assets/home';

export default function HomeSalaries() {
  return (
    <section className="section-container salaries-container">
      <div className="content section-content">
        <div className="section-content-left">
          <h2>Salary Additions</h2>
          <p>Calculation & management of salary additions</p>
          <div className="tags">
            <span className="tag">UX UI</span>
          </div>
        </div>
        <div className="section-content-right">
          <img src={homeSalaries} alt="salary additions app screen" />
        </div>
      </div>
    </section>
  );
}
