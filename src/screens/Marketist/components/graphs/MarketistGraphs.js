import './MarketistGraphs.scss';
import { marketistGraphs1, marketistGraphs2, marketistGraphs3 } from '../../../../assets/marketist';

export default function MarketistGraphs() {
  return (
    <section className="marketist-graphs-container content">
      <h2>Graphs</h2>
      <img alt="marketist app graph" src={marketistGraphs1} />
      <img alt="marketist app graph" src={marketistGraphs2} />
      <img alt="marketist app graph" src={marketistGraphs3} />
    </section>
  );
}
