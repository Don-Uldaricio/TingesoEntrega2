import React from 'react';
import Layout from './Layout';

const IngresoExitoso = () => {
  return (
    <Layout>
    <div className="flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white shadow-md rounded-lg border border-green-300 p-6">
        <div className="flex flex-col items-center">
          <svg 
            className="w-16 h-16 text-green-500 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 11l3 3L22 4" 
            />
          </svg>
          <h1 className="text-xl font-semibold text-green-500 mb-2">Ingreso realizado con éxito</h1>
          <p className="text-gray-600 text-center">El estudiante ha sido ingresado de forma exitosa</p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default IngresoExitoso;
