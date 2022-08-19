import './HomeSalaries.scss';
import { homeSalaries } from '../../../../assets/home';

function SalariesFlow() {
  return (
    <section className="section-container salaries-container">
      <div className="content section-content">
        <div className="section-content-left">
          <h2>Salary Additions</h2>
          <p>Calculation & management of salary additions</p>
        </div>
        <div className="section-content-right">
          <img src={homeSalaries} />
        </div>
      </div>
    </section>
  );
}

export default SalariesFlow;
