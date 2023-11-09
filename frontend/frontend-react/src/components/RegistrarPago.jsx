import React, { useState } from 'react';
import Layout from './Layout';
import EstudianteService from "../services/EstudianteService";
import CuotaService from "../services/CuotaService";
import { useNavigate } from 'react-router-dom';

const RegistrarPago = () => {
  const [rut, setRut] = useState('');
  const [cuotas, setCuotas] = useState(null);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const generarCuotas = async () => {
    try {
      const response = await EstudianteService.generarCuotas(rut);
      console.log(response.data);
      setCuotas(response.data);
    } catch (err) {
      setCuotas(null);
    }
  };

  const pagarCuota = async (idCuota) => {
    try {
      console.log(idCuota);
      const response = await CuotaService.pagarCuota(idCuota);
      console.log(response.data);
      navigate('/pago-exitoso');
    } catch (err) {
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rut.trim()) {
      generarCuotas();
    } else {
      setError('Por favor, ingrese un RUT válido.');
    }
  };

  return (
    <Layout>
        <div className="container flex flex-col mx-auto my-8 p-4 items-center">
        <form onSubmit={handleSubmit} className="mb-4 w-full max-w-sm">
        <label className="block mb-2 text-sm font-bold text-gray-700">
      <input
        type="text"
        placeholder='Ingrese un RUT'
        value={rut}
        onChange={(e) => setRut(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
    <button
      type="submit"
      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Registrar Pagos
    </button>
    </form>
    
    {cuotas && (
      <>
        <h2 className="w-full text-xl font-semibold mb-3 mt-6">Información de Cuotas</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Número Cuota</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Monto Inicial</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Monto Final</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Interés</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Descuento</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Fecha Expiración</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">pagar</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {cuotas.map((cuota) => (
            <tr key={cuota.idCuota} className="border-t border-gray-200">
              <td className="px-6 py-4">{cuota.numeroCuota}</td>
              <td className="px-6 py-4">{cuota.monto}</td>
              <td className="px-6 py-4">{Math.ceil(cuota.monto * (1 + cuota.interes - cuota.descuento))}</td>
              <td className="px-6 py-4">{cuota.interes}</td>
              <td className="px-6 py-4">{cuota.descuento}</td>
              <td className="px-6 py-4">{cuota.fechaExp}</td>
              <td className="px-6 py-4">
              {!cuota.pagado && (
                <button 
                    onClick={() => pagarCuota(cuota.idCuota)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                    Pagar
                </button>
                )}
              {cuota.pagado && (
                <span className="bg-blue-500 text-white font-bold py-1 px-3 rounded">
                    Pagada
                </span>
                )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    )}
    
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        </div>
    </Layout>
  );
};

export default RegistrarPago;
