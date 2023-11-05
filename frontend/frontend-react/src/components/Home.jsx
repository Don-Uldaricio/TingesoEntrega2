import React from 'react';
import Layout from './Layout';

export default function Home() {
  return (
    <Layout>
        <div className='m-auto gap-7 flex flex-col items-center w-[40%]'>
        <h1 className="mt-5 text-2xl">Bienvenido a TopEducation Chile</h1>
        <div className='flex flex-col gap-4 text-center font-bold text-white'>
            <a className='bg-lime-600 p-3 rounded-lg' href="/ingresar-estudiante">
                Ingreso de Estudiantes
            </a>
            <a className='bg-teal-500 p-3 rounded-lg' href="/consultar-cuotas">
                Ver Estado de Pago
            </a>
            <a className='bg-amber-500 p-3 rounded-lg' href="/registrar-pago">
                Registrar Pagos
            </a>
            <a className='bg-red-500 p-3 rounded-lg' href="/importar-notas">
                Importar Notas
            </a>
        </div>
        </div>
    </Layout>
  );
};
