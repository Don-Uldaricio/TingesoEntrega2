import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import Layout from './Layout';

const ImportarNotas = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      setIsUploading(true);
      setError(null);

      // Parsear el archivo CSV
      Papa.parse(file, {
        complete: async (results) => {
          try {
            // Aquí deberías transformar los resultados si es necesario antes de enviarlos
            const data = results.data;
            // Enviar los datos al backend
            await axios.put('/estudiantes/notas', data);
            alert('Las notas han sido actualizadas correctamente.');
          } catch (error) {
            setError('Hubo un error al actualizar las notas.');
            console.error(error);
          } finally {
            setIsUploading(false);
          }
        },
        header: true,
      });
    } else {
      setError('Por favor, seleccione un archivo CSV para subir.');
    }
  };

  return (
    <Layout>
        <div className="container mx-auto mt-10">
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Subir archivo CSV con notas
            </label>
            <input 
            type="file"
            onChange={handleFileChange}
            className="shadow border rounded py-2 px-3 text-gray-700"
            accept=".csv"
            />
        </div>
        <button
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isUploading}
        >
            {isUploading ? 'Subiendo...' : 'Subir Notas'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        </div>
    </Layout>
  );
};

export default ImportarNotas;
