import './Marketist.scss';
import { Navbar } from '../../components';
import {
  MarketistExample,
  MarketistExamples,
  MarketistFiles,
  MarketistGraphs,
  MarketistMain,
  MarketistSystem,
  MarketistTop,
} from './components';

export default function Marketist() {
  return (
    <>
      <Navbar />

      <MarketistTop />
      <MarketistMain />
      <MarketistExample />
      <MarketistSystem />
      <MarketistGraphs />
      <MarketistFiles />
      <MarketistExamples />
    </>
  );
}
