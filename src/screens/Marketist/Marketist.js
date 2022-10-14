import './Marketist.scss';
import {
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
      <MarketistTop />
      <MarketistMain />
      <MarketistExamples />
      <MarketistSystem />
      <MarketistGraphs />
      <MarketistFiles />
    </>
  );
}
