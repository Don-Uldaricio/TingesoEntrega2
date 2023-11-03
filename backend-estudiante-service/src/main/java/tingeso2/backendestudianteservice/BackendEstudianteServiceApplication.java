package tingeso2.backendestudianteservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BackendEstudianteServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendEstudianteServiceApplication.class, args);
	}

}
