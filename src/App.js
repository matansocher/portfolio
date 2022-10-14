import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import useGetPassword from './hooks/useGetPassword'
import { Home, Salaries, Myco, Marketist } from './screens';
import { Footer, Navbar, ScrollToTopOnPageLoad, ScrollToTopOnScroll } from './components';

export default function App() {
  const { isAuthenticated } = useGetPassword();

  if (!isAuthenticated) {
    return null;
  }
  return (
    <BrowserRouter>
      <ScrollToTopOnPageLoad />
      <ScrollToTopOnScroll />
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
