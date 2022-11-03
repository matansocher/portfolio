import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useState } from 'react';
import { Home, Salaries, Myco, Marketist } from './screens';
import { Auth, Navbar, Footer, ScrollToTopOnPageLoad, ScrollToTopOnScroll } from './components';

export default function App() {
  const defaultIsAuthState = process.env.REACT_APP_RUN_ENV === 'dev' ? true : false;
  const [isAuth, setIsAuth] = useState(defaultIsAuthState);

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />;
  }

  return (
    <BrowserRouter>
      <ScrollToTopOnPageLoad />
      {/* <ScrollToTopOnScroll /> */}
      <Navbar />
      <Routes>
        <Route path='salaries' element={<Salaries />} />
        <Route path='marketist' element={<Marketist />} />
        <Route path='myco' element={<Myco />} />
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
