import './MarketistFiles.scss';
import { marketistFiles } from '../../../../assets/marketist';

export default function MarketistFiles() {
  return (
    <section className="marketist-files-container content">
      <div className="marketist-files-container-left">
        <h2>Files management</h2>
        <p>The UI was planned to be clean & minimalistic and support the concept of an all-in-one place to manage & track the organization’s marketing operations.</p>
      </div>
      <div className="marketist-files-container-right">
        <img alt="marketist app files screen" src={marketistFiles} />
      </div>
    </section>
  );
}
