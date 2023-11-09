import axios from "axios";

class EstudianteService {
    getEstudiantes() {
        return axios.get(`http://localhost:8080/estudiantes`)
    }

    ingresarEstudiante(estudiante){
        return axios.post(`http://localhost:8080/estudiantes/ingresar-estudiante`, estudiante);
    }

    consultarPlanilla(rut){
        return axios.post(`http://localhost:8080/estudiantes/consultar-planilla/${rut}`);
    }

    generarCuotas(rut){
        return axios.get(`http://localhost:8080/estudiantes/generar-cuotas/${rut}`);
    }
}

const estudianteService = new EstudianteService();
export default estudianteService;