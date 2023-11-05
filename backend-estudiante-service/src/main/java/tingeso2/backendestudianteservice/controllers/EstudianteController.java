package tingeso2.backendestudianteservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tingeso2.backendestudianteservice.entities.Estudiante;
import tingeso2.backendestudianteservice.models.Arancel;
import tingeso2.backendestudianteservice.models.Cuota;
import tingeso2.backendestudianteservice.services.EstudianteService;

import java.util.ArrayList;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {
    @Autowired
    private EstudianteService estudianteService;

    @GetMapping("/ingresoEstudiante")
    public String mostrarIngresoEstudiantes(Model model) {
        Estudiante e = new Estudiante();
        model.addAttribute("Estudiante", e);
        return "ingresoEstudiante";

    }

    @GetMapping("/cuotaEstudiante")
    public String mostrarVistaCuotas() {
        return "cuotaEstudiante";
    }

    @PostMapping("/actualizarCuotasEstudiante")
    public String actualizarCuotasEstudiante(Model model, @Param("rut") String rut) {
        estudianteService.generarPlanilla(rut);
        Estudiante estudiante = estudianteService.findByRut(rut);
        Arancel arancel = estudianteService.buscarArancelPorRut(rut);
        ArrayList<Cuota> cuotasEstudiante = estudianteService.buscarCuotasPorRut(rut);
        ArrayList<Integer> datosArancel = estudianteService.datosPagoArancel(rut);
        model.addAttribute("cuotasEstudiante", cuotasEstudiante);
        model.addAttribute("arancel", arancel);
        model.addAttribute("estudiante", estudiante);
        model.addAttribute("datosArancel", datosArancel);
        return "cuotaEstudiante";
    }

    // En tu controlador
    @PostMapping("/guardarEstudiante")
    public String guardarEstudiante(@ModelAttribute Estudiante estudiante) {
        estudianteService.guardarEstudiante(estudiante);
        return "redirect:/ingresoEstudiante";
    }

    @GetMapping("/registrarPago")
    public String mostrarVistaPago() {
        return "registrarPago";
    }

    @PostMapping("/generarPlanillaPago")
    public String generarPlanillaPago(Model model, @Param("rut") String rut) {
        ArrayList<Cuota> cuotasEstudiante = estudianteService.buscarCuotasPorRut(rut);
        estudianteService.generarPlanilla(rut);
        model.addAttribute("cuotasEstudiante", cuotasEstudiante);
        return "registrarPago";
    }

    @GetMapping("/importarNotas")
    public String vistaImportarNotas() {
        return "importarNotas";
    }

}