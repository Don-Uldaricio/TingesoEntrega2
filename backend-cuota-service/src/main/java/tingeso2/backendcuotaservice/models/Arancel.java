package tingeso2.backendcuotaservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Arancel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idArancel;
    private Integer monto;
    private Integer numCuotas;
    private float descuento;
    private String rutEstudiante;

    public String getTipoPago() {
        if (numCuotas == 0) {
            return "Contado";
        }
        else {
            return "Cuotas";
        }
    }
}
