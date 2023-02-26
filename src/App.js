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
        <Route path='salaries' element={<ProtectedRoute><Salaries /></ProtectedRoute>} />
        <Route path='marketer' element={<ProtectedRoute><Marketer /></ProtectedRoute>} />
        <Route path='myco' element={<ProtectedRoute><Myco /></ProtectedRoute>} />
        <Route path='employees' element={<ProtectedRoute><Employees /></ProtectedRoute>} />
        <Route path='*' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
