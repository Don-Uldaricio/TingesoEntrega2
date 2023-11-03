package tingeso2.backendarancelservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tingeso2.backendarancelservice.entities.Arancel;

@Repository
public interface ArancelRepository extends JpaRepository<Arancel, Long> {
    @Query("select a from Arancel a where a.rutEstudiante = :rut")
    Arancel findByRut(@Param("rut")String rut);
}
