import './Salaries.scss';
import SalariesMain from './main/SalariesMain';
import SalariesReporting from './reporting/SalariesReporting';
import SalariesResearch from './research/SalariesResearch';
import SalariesTouch from './touch/SalariesTouch';
import SalariesFlow from './flow/SalariesFlow';
import SalariesWireframes from './wireframes/SalariesWireframes';

function Salaries() {
  return (
    <>
      <SalariesMain />
      <SalariesReporting />
      <SalariesResearch />
      <SalariesWireframes />
      <SalariesFlow />
      <SalariesTouch />
    </>
  );
}

export default Salaries;
