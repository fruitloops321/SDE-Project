package booklibrary.booklibrarysdeproject;


import booklibrary.dto.LoginRequest;
import booklibrary.dto.SignupRequest;
import booklibrary.entity.User;
import booklibrary.repository.UserRepository;
import booklibrary.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    private UserRepository userRepository;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        userRepository = Mockito.mock(UserRepository.class);
        authService = new AuthService(userRepository);
    }

    // -------------------------
    // authenticate() tests
    // -------------------------

    @Test
    void testAuthenticate_UserNotFound() {
        LoginRequest req = new LoginRequest("john", "pass");
        when(userRepository.findByUsername("john")).thenReturn(null);

        assertFalse(authService.authenticate(req));
        verify(userRepository, times(1)).findByUsername("john");
    }

    @Test
    void testAuthenticate_PasswordIncorrect() {
        LoginRequest req = new LoginRequest("john", "wrongpass");
        User user = new User("John", "Doe", "j@j.com", "john", "correctpass");

        when(userRepository.findByUsername("john")).thenReturn(user);

        assertFalse(authService.authenticate(req));
    }

    @Test
    void testAuthenticate_Success() {
        LoginRequest req = new LoginRequest("john", "correctpass");
        User user = new User("John", "Doe", "j@j.com", "john", "correctpass");

        when(userRepository.findByUsername("john")).thenReturn(user);

        assertTrue(authService.authenticate(req));
    }

    // -------------------------
    // register() tests
    // -------------------------

    @Test
    void testRegister_UsernameAvailable() {
        SignupRequest req = new SignupRequest("John", "Doe", "j@j.com", "john", "1234");

        // username does not exist
        when(userRepository.findByUsername("john")).thenReturn(null);

        boolean result = authService.register(req);

        assertTrue(result);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegister_UsernameExists_AndMatchesExactly() {
        SignupRequest req = new SignupRequest("John", "Doe", "j@j.com", "john", "1234");

        User existing = new User("A", "B", "x@x.com", "john", "pass");
        when(userRepository.findByUsername("john")).thenReturn(existing);

        boolean result = authService.register(req);

        assertFalse(result);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testRegister_UsernameExists_ButDifferent() {
        SignupRequest req = new SignupRequest("John", "Doe", "j@j.com", "john2", "1234");

        User existing = new User("A", "B", "x@x.com", "john", "pass");

        when(userRepository.findByUsername("john2")).thenReturn(existing);

        // The method checks:
        // - if usernamedummy == null → false
        // - else if !Objects.equals(existing.username, signupRequest.username)
        //   "john" != "john2" => true → should save
        boolean result = authService.register(req);

        assertTrue(result);
        verify(userRepository, times(1)).save(any(User.class));
    }
}
