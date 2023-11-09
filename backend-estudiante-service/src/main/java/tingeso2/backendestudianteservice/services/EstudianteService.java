package tingeso2.backendestudianteservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
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

    public void ingresarEstudiante(Estudiante e) {
        e.setPromedioNotas(0f);
        e.setNumeroExamenes(0);
        estudianteRepository.save(e);
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Estudiante> request = new HttpEntity<>(e, headers);
            String arancelServiceUrl = "http://backend-arancel-service/aranceles/generar-planilla";
            restTemplate.postForObject(arancelServiceUrl, request, Void.class);
        } catch (RestClientException err) {
            err.printStackTrace();
        }
    }

    public ArrayList<Cuota> actualizarCuotas(String rut) {
        String cuotaServiceUrl = "http://backend-cuota-service/cuotas/actualizar-cuotas/" + rut;
        ResponseEntity<ArrayList<Cuota>> response = restTemplate.exchange(cuotaServiceUrl, HttpMethod.POST,
                null, new ParameterizedTypeReference<ArrayList<Cuota>>() {}
        );
        return response.getBody();
    }

    public Arancel actualizarArancel(String rut, ArrayList<Cuota> cuotas) {
        String arancelServiceUrl = "http://backend-arancel-service/aranceles/actualizar-arancel/" + rut;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ArrayList<Cuota>> requestEntity = new HttpEntity<>(cuotas, headers);
        ResponseEntity<Arancel> response = restTemplate.exchange(
                arancelServiceUrl,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<Arancel>() {}
        );
        return response.getBody();
    }


    public ArrayList<Integer> datosPagoArancel(String rut, ArrayList<Cuota> cuotas) {
        String arancelServiceUrl = "http://backend-arancel-service/aranceles/calcular-datos-arancel/" + rut;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ArrayList<Cuota>> requestEntity = new HttpEntity<>(cuotas, headers);
        ResponseEntity<ArrayList<Integer>> response = restTemplate.exchange(
                arancelServiceUrl,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<ArrayList<Integer>>() {}
        );
        return response.getBody();
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