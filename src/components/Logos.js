import './styles/Logos.scss';
import assets from '../assets';

const LOGOS = [
  { name: 'amdocs', asset: assets.logoAmdocs },
  { name: 'tel-aviv-municipal', asset: assets.logoTlv },
  { name: 'controlup', asset: assets.logoControlup },
  { name: 'hippocampus', asset: assets.logoHippocampus },
  { name: 'gool', asset: assets.logoGool },
  { name: 'stefansky', asset: assets.logoStefansky },
  { name: 'marketer', asset: assets.logoMarketer },
  { name: 'myco', asset: assets.logoMyco },
]

export default function Logos() {

  const renderLogos = () => {
    return LOGOS.map(logo => {
      const { name, asset } = logo;
      return (
        <img key={name} alt={`logo of ${name}`} class={`${name}-logo`} src={asset} />
      );
    })
  }

  return (
    <div className="logos-container">
      <div className="logos-wrapper">
        <div className="logos-wrapper-container">
          {renderLogos()}
        </div>
      </div>
    </div>
  );
}
