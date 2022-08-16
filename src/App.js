import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Home, Salaries, Myco, Marketist } from './components/index';
// import { Footer, Navbar, ScrollToTop } from './components/Shared';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <ScrollToTop /> */}
        {/* <Navbar /> */}
        <Routes>
          <Route path='salaries' element={<Salaries />} />
          <Route path='marketist' element={<Marketist />} />
          <Route path='myco' element={<Myco />} />
          <Route path='*' element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
