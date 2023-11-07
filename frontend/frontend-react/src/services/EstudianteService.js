import axios from "axios";

class EstudianteService {
    getEstudiantes() {
        return axios.get(`http://localhost:8080/estudiantes`)
    }

    ingresarEstudiante(estudiante){
        return axios.post(`http://localhost:8080/estudiantes/ingresar-estudiante`, estudiante);
    }
}

const estudianteService = new EstudianteService();
export default estudianteService;