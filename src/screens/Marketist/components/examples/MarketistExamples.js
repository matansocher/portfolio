import './MarketistExamples.scss';
import { marketistExample } from '../../../../assets/marketist';

export default function MarketistExamples() {
  return (
    <section className="marketist-examples-container content">
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={marketistExample} />
        <img alt="marketist app screen" src={marketistExample} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={marketistExample} />
        <img alt="marketist app screen" src={marketistExample} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={marketistExample} />
        <img alt="marketist app screen" src={marketistExample} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={marketistExample} />
        <img alt="marketist app screen" src={marketistExample} />
      </div>
    </section>
  );
}
