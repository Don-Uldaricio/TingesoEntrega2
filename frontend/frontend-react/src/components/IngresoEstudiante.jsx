import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EstudianteService from "../services/EstudianteService";
import Layout from './Layout';

export default function IngresoEstudiante() {

  // Estado para cada uno de los campos del formulario
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [rut, setRut] = useState('');
  const [nombreColegio, setNombreColegio] = useState('');
  const [tipoColegio, setTipoColegio] = useState('');
  const [anioEgreso, setAnioEgreso] = useState('');
  const [numeroCuotas, setNumeroCuotas] = useState('');

  let navigate = useNavigate();

  const maxCuotas = tipoColegio === 'Municipal' ? 10 :
                    tipoColegio === 'Subvencionado' ? 7 : 
                    tipoColegio === 'Privado' ? 4 : 0;

  const cuotasOpciones = [...Array(maxCuotas + 1).keys()].map(cuota => (
    <option key={cuota} value={cuota}>{cuota}</option>
  ));

  // Array años de egreso
  const anios = Array.from({ length: 2023 - 1990 + 1 }, (v, k) => 1990 + k);

  const handleTipoColegioChange = (event) => {
    setTipoColegio(event.target.value);
    setNumeroCuotas('');
  };

  const handleEgresoChange = (event) => {
    setAnioEgreso(event.target.value);
  };

  const handleCuotasChange = (event) => {
    setNumeroCuotas(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    let estudiante = {
      rut: rut,
      apellidos: apellidos,
      nombres: nombres,
      tipoColegio: tipoColegio,
      nombreColegio: nombreColegio,
      egreso: anioEgreso,
      numeroCuotas: numeroCuotas
    };

    try {
      const response = await EstudianteService.ingresarEstudiante(estudiante);

      console.log(response.data);
    } catch (error) {
      console.error("Hubo un error al enviar los datos del estudiante:", error);
    }

    navigate('/ingreso-exitoso');
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-10 p-8 border rounded-lg shadow-lg">
      <h1 className='mb-7 text-center text-2xl'>Ingreso de Estudiante</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          <input 
            type="text" 
            id="nombres"
            placeholder='Nombres'
            value={nombres} 
            onChange={e => setNombres(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
          <input 
            type="text" 
            id="apellidos"
            placeholder='Apellidos'
            value={apellidos} 
            onChange={e => setApellidos(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
          <input 
            type="text" 
            id="rut"
            placeholder='RUT'
            value={rut} 
            onChange={e => setRut(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreColegio">
          <input 
            type="text" 
            id="nombreColegio"
            placeholder='Nombre del Colegio'
            value={nombreColegio} 
            onChange={e => setNombreColegio(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="tipoColegio"></label>
        <select
          id="tipoColegio"
          value={tipoColegio}
          onChange={handleTipoColegioChange}
          className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option selected  disabled value="">Seleccione tipo de colegio</option>
          <option value="Municipal">Municipal</option>
          <option value="Subvencionado">Subvencionado</option>
          <option value="Privado">Privado</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="anioEgreso"></label>
        <select
          id="anioEgreso"
          value={anioEgreso}
          onChange={handleEgresoChange}
          className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option disabled selected value="">Seleccione año de egreso</option>
          {anios.map((anio) => (
            <option key={anio} value={anio}>
              {anio}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="numeroCuotas"></label>
      <select
        id="numeroCuotas"
        value={numeroCuotas}
        onChange={handleCuotasChange}
        className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        disabled={!tipoColegio} // Deshabilitar si no se ha seleccionado el tipo de colegio
      >
        <option disabled selected value="">Seleccione número de cuotas</option>
        {cuotasOpciones}
      </select>
      </div>
      <div className="flex w-full items-center justify-between">
        <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Ingresar
        </button>
      </div>
    </form>
    </Layout>
  );
}  
