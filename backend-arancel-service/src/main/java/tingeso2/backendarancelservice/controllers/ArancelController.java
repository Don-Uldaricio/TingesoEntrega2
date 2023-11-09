package tingeso2.backendarancelservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso2.backendarancelservice.entities.Arancel;
import tingeso2.backendarancelservice.models.Cuota;
import tingeso2.backendarancelservice.models.Estudiante;
import tingeso2.backendarancelservice.services.ArancelService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/aranceles")
public class ArancelController {
    @Autowired
    private ArancelService arancelService;

    @GetMapping("/{rut}")
    public ResponseEntity<Arancel> buscarArancelPorRut(@PathVariable("rut") String rut) {
        Arancel arancel = arancelService.buscarPorRut(rut);
        if (arancel == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(arancel);
    }

    @GetMapping("/buscar-cuotas/{rut}")
    public ResponseEntity<ArrayList<Cuota>> buscarCuotas(@PathVariable("rut") String rut) {
        ArrayList<Cuota> cuotas = arancelService.buscarCuotas(rut);
        return ResponseEntity.ok(cuotas);
    }

    @PostMapping("/generar-planilla")
    public void generarPlantilla(@RequestBody Estudiante estudiante) {
        arancelService.crearArancel(estudiante);
    }

    @PostMapping("/actualizar-arancel/{rut}")
    public ResponseEntity<Arancel> actualizarArancel(@PathVariable("rut") String rut, @RequestBody ArrayList<Cuota> cuotas) {
        return ResponseEntity.ok(arancelService.actualizarArancel(rut, cuotas));
    }

    @PostMapping("/calcular-datos-arancel/{rut}")
    public ResponseEntity<ArrayList<Integer>> calcularDatosArancel(@PathVariable("rut") String rut, @RequestBody ArrayList<Cuota> cuotas) {
        return ResponseEntity.ok(arancelService.calcularDatosArancel(rut, cuotas));
    }
}