package tingeso2.backendestudianteservice.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tingeso2.backendestudianteservice.entities.Estudiante;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    @Query("select e from Estudiante e where e.rut = :rut")
    Estudiante findByRut(@Param("rut")String rut);
}