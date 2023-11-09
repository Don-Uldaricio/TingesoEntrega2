import axios from "axios";

class CuotaService {
    pagarCuota(idCuota){
        return axios.post(`http://localhost:8080/cuotas/pagar-cuota/${idCuota}`);
    }
}

const cuotaService = new CuotaService();
export default cuotaService;