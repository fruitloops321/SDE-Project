package booklibrary.service;

import booklibrary.dto.LoginRequest;
import booklibrary.dto.SignupRequest;
import booklibrary.entity.User;
import booklibrary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {

    private final UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());
        if (user == null) {
            return false;
        }
            return user.getPassword().equals(loginRequest.getPassword());
    }

    public boolean register(SignupRequest signupRequest) {
        // check if username already exists
        User usernamedummy = userRepository.findByUsername(signupRequest.getUsername());

        if (usernamedummy == null) {
            User user = new User(
                    signupRequest.getFirstName(),
                    signupRequest.getLastName(),
                    signupRequest.getEmail(),
                    signupRequest.getUsername(),
                    signupRequest.getPassword()
            );
            userRepository.save(user);
            return true;
        }
            else if (!Objects.equals(usernamedummy.getUsername(), signupRequest.getUsername())) {
                User user1 = new User(
                        signupRequest.getFirstName(),
                        signupRequest.getLastName(),
                        signupRequest.getEmail(),
                        signupRequest.getUsername(),
                        signupRequest.getPassword()
                );
                userRepository.save(user1);
                return true;
            }

        return false;
    }
}
