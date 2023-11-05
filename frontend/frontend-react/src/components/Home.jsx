import React from 'react';
import Layout from './Layout';

export default function Home() {
  return (
    <Layout>
        <div className='m-auto gap-7 flex flex-col items-center w-[40%]'>
        <h1 className="mt-5 text-2xl">Bienvenido a TopEducation Chile</h1>
        <div className='flex flex-col gap-4 text-center'>
            <a className='bg-lime-400 p-3 rounded-lg' href="/IngresoEstudiante">
                Ingreso de Estudiantes
            </a>
            <a className='bg-teal-300 p-3 rounded-lg' href="/cuotaEstudiante">
                Ver Estado de Pago
            </a>
            <a className='bg-amber-400 p-3 rounded-lg' href="/registrarPago">
                Registrar Pagos
            </a>
            <a className='bg-red-300 p-3 rounded-lg' href="/importarNotas">
                Importar Notas
            </a>
        </div>
        </div>
    </Layout>
  );
};
