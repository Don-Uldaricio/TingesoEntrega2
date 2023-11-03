package tingeso2.backendgatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BackendGatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendGatewayServiceApplication.class, args);
	}

}
