import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Home, Municipal, Myco, Atrea } from './components/index';

function App() {
  return (
    <BrowserRouter>
      <div>
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
