
import '../styles/Logos.scss';
import assets from '../assets';
// import { useEffect, useRef } from 'react';
// import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css';

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
      const { name, asset } = logo
      return (
        // <SplideSlide key={isCopy ? `copy-${name}` : name}>
          <img alt={`logo of ${name}`} src={asset} />
        // </SplideSlide>
      );
    })
  }

  return (
    <div className="logos-container splide" role="group">
      {renderLogos(false)}
    </div>
  );
}
