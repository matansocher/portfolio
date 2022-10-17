import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from './config';
import useGetPassword from './hooks/useGetPassword'
import { Home, Salaries, Myco, Marketist } from './screens';
import { Auth, Footer, Navbar, BottomNavigation, ScrollToTopOnPageLoad, ScrollToTopOnScroll } from './components';

export default function App() {
  const [path, setPath] = useState('/');
  const { isAuthenticated } = useGetPassword();

  const pathChange = (pathname) => {
    setPath(pathname);
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <BrowserRouter>
      <ScrollToTopOnPageLoad />
      <ScrollToTopOnScroll />
      {/* <Navbar /> */}
      <Routes>
        <Route path='salaries' element={<Salaries />} />
        <Route path='marketist' element={<Marketist />} />
        <Route path='myco' element={<Myco />} />
        <Route path='*' element={<Home />} />
      </Routes>
      {/* { path === '/' ? <Footer /> : <BottomNavigation pathChange={pathChange} /> } */}
      {/* <BottomNavigation /> */}
      <Footer />
    </BrowserRouter>
  );
}
