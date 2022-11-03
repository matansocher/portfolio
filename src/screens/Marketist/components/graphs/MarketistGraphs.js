import './MarketistGraphs.scss';
import assets from '../../../../assets';

export default function MarketistGraphs() {
  return (
    <section className="marketist-graphs-container content">
      <h2>Graphs</h2>
      <img alt="marketist app graph" src={assets.marketistGraphs1} />
      <img alt="marketist app graph" src={assets.marketistGraphs2} />
      <img alt="marketist app graph" src={assets.marketistGraphs3} />
    </section>
  );
}
