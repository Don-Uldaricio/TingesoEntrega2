import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import IngresoEstudiante from './components/IngresoEstudiante';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/IngresoEstudiante" element={<IngresoEstudiante />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
