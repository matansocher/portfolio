import './MarketistExamples.scss';
import assets from '../../../../assets';

export default function MarketistExamples() {
  return (
    <section className="marketist-examples-container content">
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={assets.marketistExamples1} />
        <img alt="marketist app screen" src={assets.marketistExamples2} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={assets.marketistExamples3} />
        <img alt="marketist app screen" src={assets.marketistExamples4} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={assets.marketistExamples5} />
        <img alt="marketist app screen" src={assets.marketistExamples6} />
      </div>
      <div className="marketist-examples-container-box">
        <img alt="marketist app screen" src={assets.marketistExamples7} />
        <img alt="marketist app screen" src={assets.marketistExamples8} />
      </div>
    </section>
  );
}
