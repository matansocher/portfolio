import {
  BrowserRouter,
  Routes,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Home, Municipal, Myco, Atrea } from './components/index';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul> */}

        <Routes>
          <Route path="municipal" element={<Municipal />} />
          <Route path="atrea" element={<Atrea />} />
          <Route path="myco" element={<Myco />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
