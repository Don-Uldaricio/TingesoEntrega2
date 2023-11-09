import React, { useState } from 'react';
import Layout from './Layout';
import EstudianteService from "../services/EstudianteService";

const CuotasConsulta = () => {
  const [rut, setRut] = useState('');
  const [data, setData] = useState(null);

  const consultarCuotas = async () => {
    try {
      const response = await EstudianteService.consultarPlanilla(rut);
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      setData(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    consultarCuotas();
  };

  return (
    <Layout>
    <div className="container flex flex-col mx-auto items-center p-4 my-8">
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
      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Consultar Planilla
    </button>
  </form>

  {data && (
    <>
      <h2 className="w-full text-xl font-semibold mb-3 mt-6">Información del Estudiante</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Nombres</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Apellidos</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">RUT</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Nombre del Colegio</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Tipo de Colegio</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Exámenes rendidos</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Promedio</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-t border-gray-200">
            <td className="px-6 py-4">{data.estudiante.nombres}</td>
            <td className="px-6 py-4">{data.estudiante.apellidos}</td>
            <td className="px-6 py-4">{data.estudiante.rut}</td>
            <td className="px-6 py-4">{data.estudiante.nombreColegio}</td>
            <td className="px-6 py-4">{data.estudiante.tipoColegio}</td>
            <td className="px-6 py-4">{data.estudiante.numeroExamenes}</td>
            <td className="px-6 py-4">{data.estudiante.promedioNotas}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="w-full text-xl font-semibold mb-3 mt-6">Información del Arancel</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Tipo de Pago</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Número de Cuotas</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Monto Total</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Monto restante</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Monto Pagado</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Cuotas Pagadas</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Cuotas Atrasadas</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="border-t border-gray-200">
            <td className="px-6 py-4">{data.arancel.tipoPago}</td>
            <td className="px-6 py-4">{data.arancel.numCuotas}</td>
            <td className="px-6 py-4">{data.arancel.monto}</td>
            <td className="px-6 py-4">{data.datosArancel[1]}</td>
            <td className="px-6 py-4">{data.datosArancel[0]}</td>
            <td className="px-6 py-4">{data.datosArancel[2]}</td>
            <td className="px-6 py-4">{data.datosArancel[3]}</td>
          </tr>
        </tbody>
      </table>

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
            <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Fecha de pago</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.cuotasEstudiante.map((cuota) => (
            <tr key={cuota.idCuota} className="border-t border-gray-200">
              <td className="px-6 py-4">{cuota.numeroCuota}</td>
              <td className="px-6 py-4">{cuota.monto}</td>
              <td className="px-6 py-4">{Math.ceil(cuota.monto * (1 + cuota.interes - cuota.descuento))}</td>
              <td className="px-6 py-4">{cuota.interes}</td>
              <td className="px-6 py-4">{cuota.descuento}</td>
              <td className="px-6 py-4">{cuota.fechaExp}</td>
              <td className="px-6 py-4">{cuota.fechaPago}</td>
              {/* Añadir más celdas si hay más datos en el objeto Cuota */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )}
</div>

    </Layout>
  );
};

export default CuotasConsulta;
