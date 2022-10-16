import './MarketistExamples.scss';
import { marketistExamples1, marketistExamples2, marketistExamples3, marketistExamples4, marketistExamples5, marketistExamples6, marketistExamples7, marketistExamples8 } from '../../../../assets/marketist';

export default function MarketistExamples() {
  return (
    <section className="marketist-examples-container content">
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={marketistExamples1} />
        <img alt="marketist app screen" src={marketistExamples2} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={marketistExamples3} />
        <img alt="marketist app screen" src={marketistExamples4} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={marketistExamples5} />
        <img alt="marketist app screen" src={marketistExamples6} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={marketistExamples7} />
        <img alt="marketist app screen" src={marketistExamples8} />
      </div>
    </section>
  );
}
