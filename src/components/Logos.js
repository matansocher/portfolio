
import './styles/Logos.scss';
import assets from '../assets';

const LOGOS = [
  { name: 'amdocs', asset: assets.logoAmdocs },
  { name: 'tel aviv municipal', asset: assets.logoTlv },
  { name: 'hippocampus', asset: assets.logoHippocampus },
  { name: 'stefansky', asset: assets.logoStefansky },
  { name: 'marketer', asset: assets.logoMarketer },
  { name: 'myco', asset: assets.logoMyco },
]

export default function Logos() {

  const renderLogos = (isCopy) => {
    return LOGOS.map(logo => {
      const { name, asset } = logo;
      return (
        <img key={isCopy ? `copy-${name}` : name} alt={`logo of ${name}`} src={asset} />
      );
    })
  }

  return (
    <div className="logos-container">
      <div className="logos-wrapper">
        <div className="logos-wrapper-container">
          {renderLogos(false)}
          {renderLogos(true)}
        </div>
      </div>
    </div>
  );
}
