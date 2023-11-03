package tingeso2.backendarancelservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tingeso2.backendarancelservice.services.ArancelService;

@RestController
@RequestMapping
public class ArancelController {
    @Autowired
    private ArancelService arancelService;
}