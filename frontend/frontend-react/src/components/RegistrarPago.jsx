import React, { useState } from 'react';
import Layout from './Layout';

const RegistrarPago = () => {
  const [rut, setRut] = useState('');
  const [cuotas, setCuotas] = useState([]);
  const [error, setError] = useState('');

  const obtenerCuotas = () => {
    // Simulación de obtención de datos, reemplazar con la llamada a la API real
    const cuotasObtenidas = [
      { id: 1, monto: 10000, pagado: false },
      { id: 2, monto: 15000, pagado: false },
      // Agregar más cuotas según sea necesario
    ];

    setCuotas(cuotasObtenidas);
    setError('');
  };

  const pagarCuota = (idCuota) => {
    // Aquí deberías reemplazar con una llamada a la API para actualizar el estado de la cuota
    setCuotas(cuotas.map(cuota => 
      cuota.id === idCuota ? { ...cuota, pagado: true } : cuota
    ));
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
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Registrar Pagos
            </button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ul className="list-disc">
            {cuotas.map((cuota) => (
            <li key={cuota.id} className="bg-gray-100 rounded my-2 py-2 px-4 flex justify-between items-center">
                Cuota {cuota.id}: {cuota.monto} - {cuota.pagado ? 'Pagada' : 'Pendiente'}
                {!cuota.pagado && (
                <button 
                    onClick={() => pagarCuota(cuota.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                >
                    Pagar
                </button>
                )}
            </li>
            ))}
        </ul>
        </div>
    </Layout>
  );
};

export default RegistrarPago;
