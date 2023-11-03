package tingeso2.backendarancelservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BackendArancelServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendArancelServiceApplication.class, args);
	}

}
