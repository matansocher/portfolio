import './MarketistExamples.scss';
import { marketistExamples } from '../../../../assets/marketist';

export default function MarketistExamples() {
  return (
    <section className="marketist-examples-container content">
      <img alt="marketist app screen" src={marketistExamples} />
    </section>
  );
}
