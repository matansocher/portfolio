import './Myco.scss';
import { Navbar } from '../../components';
import { MycoMain, MycoResearch, MycoWireframes, MycoSearch, MycoProducers, MycoThanks } from './components';

export default function Myco() {
  return (
    <>
      <Navbar />

      <MycoMain />
      <MycoResearch />
      <MycoWireframes />
      <MycoSearch />
      <MycoProducers />
      <MycoThanks />
    </>
  );
}
