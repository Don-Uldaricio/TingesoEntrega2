package tingeso2.backendcuotaservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tingeso2.backendcuotaservice.entities.Cuota;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface CuotaRepository extends JpaRepository<Cuota, Long> {
    @Query("select c from Cuota c where c.idCuota = :idCuota")
    Cuota findById(@Param("idCuota") Integer idCuota);

    @Query("select c from Cuota c where c.idArancel = :idArancel")
    List<Cuota> findByIdArancel(@Param("idArancel")Long idArancel);

    @Query("select c from Cuota c where c.rutEstudiante = :rut")
    ArrayList<Cuota> findByRutEstudiante(@Param("rut") String rut);
}
