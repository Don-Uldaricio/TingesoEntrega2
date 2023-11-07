package tingeso2.backendestudianteservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import tingeso2.backendestudianteservice.entities.Estudiante;
import tingeso2.backendestudianteservice.models.Arancel;
import tingeso2.backendestudianteservice.models.Cuota;
import tingeso2.backendestudianteservice.repositories.EstudianteRepository;

import java.util.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class EstudianteService {
    @Autowired
    EstudianteRepository estudianteRepository;

    @Autowired
    RestTemplate restTemplate;

    public List<Estudiante> getAllEstudiantes() {
        return estudianteRepository.findAll();
    }

    public Estudiante findByRut(String rut){
        return estudianteRepository.findByRut(rut);
    }

    public List<Cuota> buscarCuotasPorRut(String rut) {
        return restTemplate.getForObject("http://backend-cuota-service/cuotas/" + rut, List.class);
    }

    public Arancel buscarArancelPorRut(String rut) {
        return restTemplate.getForObject("http://backend-arancel-service/aranceles/" + rut, Arancel.class);
    }

    public void ingresarEstudiante(Estudiante e) {
        e.setPromedioNotas(0f);
        e.setNumeroExamenes(0);
        estudianteRepository.save(e);
        try {
            String arancelServiceUrl = "http://backend-arancel-service/aranceles/generar-plantilla/" + e.getRut();
            restTemplate.postForObject(arancelServiceUrl, e.getRut(), Void.class);
        } catch (RestClientException err) {
            err.printStackTrace();
        }
    }

    public void generarPlanilla(String rut) {
        try {
            String arancelServiceUrl = "http://backend-arancel-service/aranceles/actualizar/" + rut;
            restTemplate.postForObject(arancelServiceUrl, rut, Void.class);
        } catch (RestClientException e) {
            e.printStackTrace();
        }
    }

    public ArrayList<Integer> datosPagoArancel(String rut) {
        String arancelServiceUrl = "http://backend-arancel-service/aranceles/datos-arancel/" + rut;
        return restTemplate.postForObject(arancelServiceUrl, rut, ArrayList.class);
    }

    public void calcularDescuentoNotas(String[] datos) {
        Estudiante estudiante = findByRut(datos[0]);
        estudiante.setNumeroExamenes(estudiante.getNumeroExamenes() + 1);
        estudianteRepository.save(estudiante);

        String fechaPrueba = datos[1];
        float promedioNotas = Float.parseFloat(datos[2]);

        DateTimeFormatter formato = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fecha = LocalDate.parse(fechaPrueba, formato);
        int mesExamen = fecha.getMonthValue();

        if (mesExamen < 10) {
            String url = "http://backend-arancel-service/aranceles/calcular-descuento/" + datos[0];
            // Creamos el objeto que vamos a enviar
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("mesExamen", mesExamen);
            requestBody.put("promedioNotas", promedioNotas);

            // Crear el objeto HttpEntity que incluye el request body y los headers si son necesarios
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody);

            // Realizar la petición POST
            restTemplate.postForObject(url, requestEntity, Void.class);
        }
    }

}