import './Salaries.scss';
import { Navbar } from '../../components';
import { SalariesMain, SalariesReporting, SalariesResearch, SalariesTouch, SalariesFlow, SalariesWireframes } from './components';

export default function Salaries() {
  return (
    <>
      <Navbar />

      <SalariesMain />
      <SalariesReporting />
      <SalariesResearch />
      <SalariesWireframes />
      <SalariesFlow />
      <SalariesTouch />
    </>
  );
}
