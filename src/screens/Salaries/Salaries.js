import './Salaries.scss';
import { SalariesMain, SalariesReporting, SalariesResearch, SalariesTouch, SalariesFlow, SalariesWireframes } from './components';

export default function Salaries() {
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
