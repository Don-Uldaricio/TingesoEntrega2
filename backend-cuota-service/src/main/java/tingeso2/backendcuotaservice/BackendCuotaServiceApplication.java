package tingeso2.backendcuotaservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BackendCuotaServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendCuotaServiceApplication.class, args);
	}

}
