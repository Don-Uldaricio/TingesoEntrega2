package tingeso2.backendarancelservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idEstudiante;
    private String rut;
    private String apellidos;
    private String nombres;
    private String fechaNacimiento;
    private String tipoColegio;
    private String nombreColegio;
    private Integer egreso;
    private Integer numeroCuotas;
    private Integer numeroExamenes;
    private Float promedioNotas;
}
