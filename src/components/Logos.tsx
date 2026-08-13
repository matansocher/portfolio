import './styles/Logos.scss';
import assets from '@/assets';

const LOGOS = [
  { name: 'practitest', asset: assets.logoPractitest },
  { name: 'personetics', asset: assets.logoPersonetics },
  { name: 'jfrog', asset: assets.logoJfrog },
  { name: 'controlup', asset: assets.logoControlup },
  { name: 'hippocampus', asset: assets.logoHippoCampus },
  { name: 'gool', asset: assets.logoGool },
  { name: 'trustech', asset: assets.logoTrustech },
  { name: 'amdocs', asset: assets.logoAmdocs },
  { name: 'tlv-muni', asset: assets.logoTlvMuni },
  { name: 'sqlink', asset: assets.logoSqlink },
  { name: 'teva', asset: assets.logoTeva },
  { name: 'beacon', asset: assets.logoBeacon },
  { name: 'marketer', asset: assets.logoMarketer },
  { name: 'myco', asset: assets.logoMyco },
  { name: 'team-stefansky', asset: assets.logoTeamStefansky },
  { name: 'brinks', asset: assets.logoBrinks },
];

export default function Logos() {
  const renderLogos = () => {
    return LOGOS.map((logo) => {
      const { name, asset } = logo;
      return <img key={name} alt={`logo of ${name}`} className={`${name}-logo`} src={asset} />;
    });
  };

  return (
    <div className="logos-container">
      <div className="logos-wrapper">
        <div className="logos-wrapper-container">{renderLogos()}</div>
      </div>
    </div>
  );
}
