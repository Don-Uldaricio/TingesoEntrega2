import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import IngresoEstudiante from './components/IngresoEstudiante';
import ConsultarCuotas from './components/ConsultarCuotas';
import RegistrarPago from './components/RegistrarPago';
import ImportarNotas from './components/ImportarNotas';
import PagoExitoso from './components/PagoExitoso';
import IngresoExitoso from './components/IngresoExitoso';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ingresar-estudiante" element={<IngresoEstudiante />} />
          <Route path="/consultar-cuotas" element={<ConsultarCuotas />} />
          <Route path="/registrar-pago" element={<RegistrarPago />} />
          <Route path="/importar-notas" element={<ImportarNotas />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/ingreso-exitoso" element={<IngresoExitoso />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
