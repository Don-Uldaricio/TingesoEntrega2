package tingeso2.backendcuotaservice.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tingeso2.backendcuotaservice.entities.Cuota;
import tingeso2.backendcuotaservice.models.Arancel;
import tingeso2.backendcuotaservice.services.CuotaService;

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

}
