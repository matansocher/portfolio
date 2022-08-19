import './Home.scss';
import { Link } from 'react-router-dom';
import { HomeMain, HomeMyco, HomeSalaries, HomeMarketist } from './components';

function Home() {
  return (
    <>
      <HomeMain />
      <Link to="/myco" style={{ textDecoration: 'none' }}><HomeMyco /></Link>
      <Link to="/salaries" style={{ textDecoration: 'none' }}><HomeSalaries /></Link>
      {/* <Link to="/marketist" style={{ textDecoration: 'none' }}><HomeMarketist /></Link> */}
      <HomeMarketist />
    </>
  );
}

export default Home;
