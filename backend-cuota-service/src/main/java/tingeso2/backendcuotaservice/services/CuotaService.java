package tingeso2.backendcuotaservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tingeso2.backendcuotaservice.entities.Cuota;
import tingeso2.backendcuotaservice.models.Arancel;
import tingeso2.backendcuotaservice.repositories.CuotaRepository;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CuotaService {
    @Autowired
    CuotaRepository cuotaRepository;

    public Cuota buscarCuotaPorId(Integer idCuota) { return cuotaRepository.findById(idCuota);}

    // Método invocado por ArancelService que se encarga de crear las cuotas
    public void crearCuotas(Arancel arancel) {
        int valorCuota = arancel.getMonto() / arancel.getNumCuotas();
        for (int i = 0; i < arancel.getNumCuotas(); i++) {
            Cuota cuota = new Cuota();
            cuota.setNumeroCuota(i+1);
            cuota.setMonto(valorCuota);
            cuota.setDescuento(0);
            cuota.setPagado(false);
            cuota.setFechaPago("");
            cuota.setIdArancel(arancel.getIdArancel());
            cuota.setRutEstudiante(arancel.getRutEstudiante());

            // Seteamos la fecha de expiración de cada cuota
            if (i < 9) {
                cuota.setFechaExp(LocalDate.now().getYear() +"-0"+ (i + 1) +"-10");
            } else {
                cuota.setFechaExp(LocalDate.now().getYear() +"-10" +"-10");
            }
            cuotaRepository.save(cuota);
        }
    }

    public ArrayList<Cuota> buscarCuotasPorRut(String rut) {
        return cuotaRepository.findByRutEstudiante(rut);
    }

    public ArrayList<Cuota> listarCuotas(Long idArancel) {
        ArrayList<Cuota> cuotas = new ArrayList<>();
        for (Cuota c: cuotaRepository.findAll()) {
            if (Objects.equals(c.getIdArancel(), idArancel)) {
                cuotas.add(c);
            }
        }
        return cuotas;
    }

    // Cambia el estado de una cuota a pagado y setea la fecha en la que se realizó
    public void pagarCuota(Cuota c) {
        c.setPagado(true);
        c.setFechaPago(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        cuotaRepository.save(c);
    }

    // Actualiza el valor de las cuotas calculando sus meses de atraso y el interés
    public ArrayList<Cuota> actualizarCuotas(String rut) {
        ArrayList<Cuota> cuotas = buscarCuotasPorRut(rut);
        for (Cuota c: cuotas) {
            if (!c.getPagado()) {
                c = calcularAtrasoCuota(c);
                cuotaRepository.save(c);
            }
        }
        return cuotas;
    }

    // Calcula el interés de una cuota por meses de atraso
    public Cuota calcularAtrasoCuota(Cuota cuota) {
        int mesesAtraso = calcularMesesAtraso(cuota);
        if (mesesAtraso == 0) {
            cuota.setInteres(0);
        } else if (mesesAtraso == 1) {
            cuota.setInteres(0.03f);
        } else if (mesesAtraso == 2) {
            cuota.setInteres(0.06f);
        } else if (mesesAtraso == 3) {
            cuota.setInteres(0.09f);
        } else {
            cuota.setInteres(0.15f);
        }
        cuota.setMesesAtraso(mesesAtraso);
        return cuota;
    }

    // Calcula los meses de atraso de una cuota
    public int calcularMesesAtraso(Cuota cuota) {
        DateTimeFormatter formato = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fechaExpiracion = LocalDate.parse(cuota.getFechaExp(), formato);
        LocalDate fechaActual = LocalDate.now();
        Period diferencia = Period.between(fechaExpiracion, fechaActual);
        return diferencia.getMonths();
    }

    // Aplica descuento a una cuota por haber rendido una prueba
    public void calcularDescuentoCuota(Cuota cuota, Float descuento) {
        cuota.setDescuento(descuento);
        cuotaRepository.save(cuota);
    }
}
