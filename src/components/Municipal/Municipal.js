import './Municipal.scss';
import MunicipalMain from './main/MunicipalMain';
import MunicipalReporting from './reporting/MunicipalReporting';
import MunicipalResearch from './research/MunicipalResearch';
import MunicipalTouch from './touch/MunicipalTouch';
import MunicipalFlow from './flow/MunicipalFlow';
import MunicipalWireframes from './wireframes/MunicipalWireframes';

function Municipal() {
  return (
    <>
      <MunicipalMain />
      <MunicipalReporting />
      <MunicipalResearch />
      <MunicipalWireframes />
      <MunicipalFlow />
      <MunicipalTouch />
    </>
  );
}

export default Municipal;
