package tingeso2.backendestudianteservice.controllers;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tingeso2.backendestudianteservice.entities.Estudiante;
import tingeso2.backendestudianteservice.models.Arancel;
import tingeso2.backendestudianteservice.models.Cuota;
import tingeso2.backendestudianteservice.services.EstudianteService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {
    @Autowired
    private EstudianteService estudianteService;

    @GetMapping
    public ResponseEntity<List<Estudiante>> getEstudiantes(){
        List<Estudiante> estudiantes = estudianteService.getAllEstudiantes();
        if(estudiantes.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(estudiantes);
    }

    @GetMapping("/{rut}")
    public ResponseEntity<Estudiante> findByRut(@PathVariable("rut") String rut){
        Estudiante estudiante = estudianteService.findByRut(rut);
        if(estudiante == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estudiante);
    }

    @PostMapping("/ingresar-estudiante")
    public ResponseEntity<Estudiante> ingresarEstudiante(@RequestBody Estudiante estudiante) {
        estudianteService.ingresarEstudiante(estudiante);
        return ResponseEntity.ok(estudiante);
    }

    @PostMapping("/consultar-planilla/{rut}")
    public ResponseEntity<Map<String, Object>> consultarPlanilla(@PathVariable("rut") String rut) {
        ArrayList<Cuota> cuotasEstudiante = estudianteService.actualizarCuotas(rut);
        Arancel arancel = estudianteService.actualizarArancel(rut, cuotasEstudiante);
        ArrayList<Integer> datosArancel = estudianteService.datosPagoArancel(rut, cuotasEstudiante);

        Estudiante estudiante = estudianteService.findByRut(rut);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("cuotasEstudiante", cuotasEstudiante);
        response.put("arancel", arancel);
        response.put("estudiante", estudiante);
        response.put("datosArancel", datosArancel);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/generar-cuotas/{rut}")
    public ResponseEntity<ArrayList<Cuota>> generarPlanillaPago(@PathVariable("rut") String rut) {
        return ResponseEntity.ok(estudianteService.actualizarCuotas(rut));
    }

}