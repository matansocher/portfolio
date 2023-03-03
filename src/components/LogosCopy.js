import './styles/Logos.scss';
import assets from '../assets';
import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LOGOS = [
  { name: 'amdocs', asset: assets.logoAmdocs },
  { name: 'tel aviv municipal', asset: assets.logoTlv },
  { name: 'hippocampus', asset: assets.logoHippocampus },
  { name: 'stefansky', asset: assets.logoStefansky },
  { name: 'marketer', asset: assets.logoMarketer },
  { name: 'myco', asset: assets.logoMyco },
]

export default function Logos() {

  const containerRef = useRef(null);
  const options = {
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 10,
    speed: 2000,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    cssEase: "linear",
  }

  const renderLogos = (isCopy) => {
    return LOGOS.map(logo => {
      const { name, asset } = logo;
      return (
        <div className="logo-item" key={isCopy ? `copy-${name}` : name}>
          <img alt={`logo of ${name}`} src={asset} />
        </div>
      );
    })
  }

  return (
    <div className="logos-container" ref={containerRef}>
      <Slider {...options}>
        {renderLogos(false)}
      </Slider>
      {/* {renderLogos(true)} */}
      {/* <img alt="logo of amdocs" src={assets.logoAmdocs} />
      <img alt="logo of tel aviv municipal" src={assets.logoTlv} />
      <img alt="logo of hippocampus" src={assets.logoHippocampus} />
      <img alt="logo of stefansky" src={assets.logoStefansky} />
      <img alt="logo of marketer" src={assets.logoMarketer} />
      <img alt="logo of myco" src={assets.logoMyco} />

      <img alt="logo of amdocs" src={assets.logoAmdocs} />
      <img alt="logo of tel aviv municipal" src={assets.logoTlv} />
      <img alt="logo of hippocampus" src={assets.logoHippocampus} />
      <img alt="logo of stefansky" src={assets.logoStefansky} />
      <img alt="logo of marketer" src={assets.logoMarketer} />
      <img alt="logo of myco" src={assets.logoMyco} /> */}
    </div>
  );
}
