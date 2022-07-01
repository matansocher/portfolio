import './Home.scss';
import { Link } from 'react-router-dom';
import HomeMain from './main/HomeMain';
import HomeMyco from './myco/HomeMyco';
import HomeMunicipal from './municipal/HomeMunicipal';
import HomeAtrea from './atrea/HomeAtrea';

function Home() {
  return (
    <>
      <HomeMain />
      <Link to="/myco" style={{ textDecoration: 'none' }}><HomeMyco /></Link>
      <Link to="/municipal" style={{ textDecoration: 'none' }}><HomeMunicipal /></Link>
      {/* <Link to="/atrea" style={{ textDecoration: 'none' }}><HomeAtrea /></Link> */}
      <HomeAtrea />
    </>
  );
}

export default Home;
