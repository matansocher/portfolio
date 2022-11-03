import './Home.scss';
import { HomeMain, HomeMyco, HomeSalaries, HomeMarketist } from './components';

export default function Home() {
  return (
    <>
      <HomeMain />
      <HomeMyco />
      <HomeSalaries />
      <HomeMarketist />
    </>
  );
}
