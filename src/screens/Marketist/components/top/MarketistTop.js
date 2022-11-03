import './MarketistTop.scss';
import assets from '../../../../assets';

export default function MarketistTop() {
  return (
    <>
      <section className="marketist-top-container" style={{ backgroundImage: `url('${assets.marketistTopUnder}')` }}>
        <img alt="marketist app screen" src={assets.marketistTopOver} />
      </section>
    </>
  );
}
