import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

const ConsultarCuotas = () => {
  const [rut, setRut] = useState('');
  const [cuotas, setCuotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const obtenerCuotas = async () => {
    setLoading(true);
    setError('');
    try {
      // Asegúrate de reemplazar la URL con tu endpoint correcto
      const response = await axios.get(`/estudiantes/cuotas/${rut}`);
      setCuotas(response.data);
    } catch (err) {
      setError('Ocurrió un error al obtener las cuotas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rut.trim()) {
      obtenerCuotas();
    } else {
      setError('Por favor, ingrese un RUT válido.');
    }
  };

  return (
    <Layout>
        <div className="flex flex-col items-center my-8">
        <form onSubmit={handleSubmit} className="mb-4 w-full max-w-sm">
            <div className="mb-6">
            <label htmlFor="rut" className="block text-gray-700 text-sm font-bold mb-2">
                RUT del Estudiante:
            </label>
            <input
                type="text"
                id="rut"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="Ingrese RUT"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            </div>
            <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Consultar Cuotas
            </button>
        </form>
        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ul className="list-disc">
            {cuotas.map((cuota, index) => (
            <li key={index} className="bg-gray-100 rounded my-2 py-2 px-4">
                Cuota {index + 1}: {cuota.estado}
            </li>
            ))}
        </ul>
        </div>
    </Layout>
  );
};

export default ConsultarCuotas;
