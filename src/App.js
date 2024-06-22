import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { BusinessCard, Employees, Home, Salaries, Myco, Marketer } from './screens';
import { ProtectedRoute, ScrollToTopOnPageLoad } from './components';
import './styles/_shared.scss';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnPageLoad />
      {/* <ScrollToTopOnScroll /> */}
      <Routes>
        <Route path='business-card' element={<BusinessCard />} />
        <Route path='salaries' element={<Salaries />} />
        <Route path='marketer' element={<Marketer />} />
        <Route path='myco' element={<Myco />} />
        <Route path='employees' element={<Employees />} />
        <Route path='*' element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
