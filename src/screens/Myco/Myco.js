import './Myco.scss';
import { Navbar } from '../../components';
import { MycoMain, MycoResearch, MycoSearch, MycoProducers, MycoThanks } from './components';

export default function Myco() {
  return (
    <>
      <Navbar />

      <MycoMain />
      <MycoResearch />
      <MycoSearch />
      <MycoProducers />
      <MycoThanks />
    </>
  );
}
