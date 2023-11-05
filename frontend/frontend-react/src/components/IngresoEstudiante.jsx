import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

export default function IngresoEstudiante() {
  // Estado para cada uno de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [nombreColegio, setNombreColegio] = useState('');
  const [tipoColegio, setTipoColegio] = useState('');
  const [anioEgreso, setAnioEgreso] = useState('');
  const [numeroCuotas, setNumeroCuotas] = useState('');

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

  // Definir el número máximo de cuotas en función del tipo de colegio
  const maxCuotas = tipoColegio === 'Municipal' ? 10 :
                    tipoColegio === 'Subvencionado' ? 7 : 
                    tipoColegio === 'Privado' ? 4 : 0;

  // Crear opciones de cuotas basadas en el máximo
  const cuotasOpciones = [...Array(maxCuotas + 1).keys()].map(cuota => (
    <option key={cuota} value={cuota}>{cuota}</option>
  ));

  // Array años de egreso
  const anios = Array.from({ length: 2023 - 1990 + 1 }, (v, k) => 1990 + k);
  // Manejador para el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      const response = await axios.post('/estudiantes', {
        nombre,
        apellido,
        rut,
        tipoColegio,
        anioEgreso: parseInt(anioEgreso), // Asegurarse de que sea un número
        numeroCuotas: parseInt(numeroCuotas), // Asegurarse de que sea un número
      });

      console.log(response.data); // Tratar la respuesta del servidor como se desee
    } catch (error) {
      console.error("Hubo un error al enviar los datos del estudiante:", error);
    }
  };

  // JSX para el formulario
  return (
    <Layout>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-10 p-8 border rounded-lg shadow-lg">
      <h1 className='mb-7 text-center text-2xl'>Ingreso de Estudiante</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          <input 
            type="text" 
            id="nombre"
            placeholder='Nombre'
            value={nombre} 
            onChange={e => setNombre(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
          <input 
            type="text" 
            id="apellido"
            placeholder='Apellido'
            value={apellido} 
            onChange={e => setApellido(e.target.value)}
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
