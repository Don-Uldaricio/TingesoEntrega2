package tingeso2.backendcuotaservice.controllers;


import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso2.backendcuotaservice.entities.Cuota;
import tingeso2.backendcuotaservice.models.Arancel;
import tingeso2.backendcuotaservice.services.CuotaService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cuotas")
public class CuotaController {
    @Autowired
    private CuotaService cuotaService;

    /*
    @PostMapping("/pagar-cuota")
    public String modificarCuota(@RequestParam Integer idCuota) {
        // Obtén la cuota de la base de datos utilizando cuotaId
        Cuota cuota = cuotaService.buscarCuotaPorId(idCuota);

        if (cuota != null) {
            // Modifica el estado de la cuota como desees
            cuota = cuotaService.pagarCuota(cuota);

            // Guarda la cuota modificada en la base de datos
            cuotaService.guardarCuota(cuota);
        }

        // Redirige a donde desees después de modificar la cuota
        return "redirect:/registrarPago";
    }
    */

    @PostMapping("/crear-cuotas")
    public void crearCuotas(@RequestBody Arancel arancel) {
        cuotaService.crearCuotas(arancel);
    }

    @GetMapping("/{rut}")
    public ResponseEntity<ArrayList<Cuota>> buscarCuotasPorRut(@PathVariable("rut") String rut) {
        ArrayList<Cuota> cuotas = cuotaService.buscarCuotasPorRut(rut);
        if (cuotas.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cuotas);
    }

    @PostMapping("/actualizar-cuotas/{rut}")
    public ResponseEntity<ArrayList<Cuota>> actualizarCuotas(@PathVariable("rut") String rut) {
        return ResponseEntity.ok(cuotaService.actualizarCuotas(rut));
    }

    @PostMapping("/pagar-cuota/{idCuota}")
    public void pagarCuota(@PathVariable Integer idCuota) {
        Cuota cuota = cuotaService.buscarCuotaPorId(idCuota);
        cuotaService.pagarCuota(cuota);
    }

}
