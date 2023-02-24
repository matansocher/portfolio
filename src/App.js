import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from 'react';
import { BusinessCard, Home, Salaries, Myco, Marketer } from './screens';
import { Auth } from './components';
import './styles/_shared.scss';

export default function App() {
  const defaultIsAuthState = process.env.REACT_APP_RUN_ENV === 'dev' ? true : false;
  const [isAuth, setIsAuth] = useState(defaultIsAuthState);

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />;
  }

  return (
    <BrowserRouter>
      {/* <ScrollToTopOnPageLoad /> */}
      {/* <ScrollToTopOnScroll /> */}
      <Routes>
        <Route path='card' element={<BusinessCard />} />
        <Route path='salaries' element={<Salaries />} />
        <Route path='marketer' element={<Marketer />} />
        <Route path='myco' element={<Myco />} />
        <Route path='*' element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
