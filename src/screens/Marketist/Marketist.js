import './Marketist.scss';
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
