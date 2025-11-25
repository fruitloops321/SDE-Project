package booklibrary.controller;

import booklibrary.dto.LoginRequest;
import booklibrary.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public boolean login(@RequestBody LoginRequest loginRequest) {
        return authService.authenticate(loginRequest);
    }
}
