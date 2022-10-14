import './MarketistExample.scss';
import { marketistExample } from '../../../../assets/marketist';

export default function MarketistExample() {
  return (
    <section className="marketist-example-container content">
      <img alt="marketist app screen" src={marketistExample} />
    </section>
  );
}
