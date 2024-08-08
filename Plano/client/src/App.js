import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";

import { BrowserRouter} from 'react-router-dom'

import Home from './pages/screens/Home'
import List from './pages/screens/List'
import Scan from './pages/screens/Scan'

function App() {
  return (
    <div>

      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="my-list" element={<List />} />
              <Route path="scan-item" element={<Scan />} />
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
