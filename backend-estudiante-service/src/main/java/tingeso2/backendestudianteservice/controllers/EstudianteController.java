package tingeso2.backendestudianteservice.controllers;

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
import java.util.List;

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

    @GetMapping("/cuotas/{rut}")
    public ResponseEntity<List<Cuota>> getCuotas(@PathVariable("rut") String rut){
        Estudiante estudiante = estudianteService.findByRut(rut);
        if(estudiante == null){
            return ResponseEntity.notFound().build();
        }
        List<Cuota> cuotas = estudianteService.buscarCuotasPorRut(rut);
        if(cuotas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cuotas);
    }

    @PostMapping("/actualizar-cuotas/{rut}")
    public ResponseEntity<List<Cuota>> actualizarCuotasEstudiante(@PathVariable("rut") String rut) {
        Estudiante estudiante = estudianteService.findByRut(rut);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }
        List<Cuota> cuotas = estudianteService.buscarCuotasPorRut(rut);
        if (cuotas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        estudianteService.generarPlanilla(rut);
        return ResponseEntity.ok(cuotas);
    }

}