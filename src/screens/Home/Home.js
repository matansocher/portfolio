import './Home.scss';
import { Navbar } from '../../components';
import { HomeMain, HomeMyco, HomeSalaries, HomeMarketist } from './components';

export default function Home() {
  return (
    <>
      <Navbar />

      <HomeMain />
      <HomeMyco />
      <HomeSalaries />
      <HomeMarketist />
    </>
  );
}
