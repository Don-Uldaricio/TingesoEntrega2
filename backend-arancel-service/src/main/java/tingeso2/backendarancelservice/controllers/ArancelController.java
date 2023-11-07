package tingeso2.backendarancelservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tingeso2.backendarancelservice.entities.Arancel;
import tingeso2.backendarancelservice.models.Estudiante;
import tingeso2.backendarancelservice.services.ArancelService;

@RestController
@RequestMapping("/aranceles")
public class ArancelController {
    @Autowired
    private ArancelService arancelService;

    @PostMapping("/generar-plantilla")
    public void generarPlantilla(@RequestBody Estudiante estudiante) {
        arancelService.crearArancel(estudiante);
    }
}