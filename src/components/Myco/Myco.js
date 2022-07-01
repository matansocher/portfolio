import './Myco.scss';
import MycoMain from './main/MycoMain';
import MycoResearch from './research/MycoResearch';
import MycoSearch from './search/MycoSearch';
import MycoProducers from './producers/MycoProducers';
import MycoThanks from './thanks/MycoThanks';

function Myco() {
  return (
    <>
      <MycoMain />
      <MycoResearch />
      <MycoSearch />
      <MycoProducers />
      <MycoThanks />
    </>
  );
}

export default Myco;
