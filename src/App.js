import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Home, Salaries, Myco, Marketist } from './screens';
import { Footer, Navbar, ScrollToTopOnPageLoad, ScrollToTopOnScroll } from './components';

function App() {
  return (
    <BrowserRouter>
      <div>
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
      </div>
    </BrowserRouter>
  );
}

export default App;
