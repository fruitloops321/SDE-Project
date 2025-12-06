package booklibrary.booklibrarysdeproject;

import booklibrary.controller.AuthController;
import booklibrary.dto.LoginRequest;
import booklibrary.dto.SignupRequest;
import booklibrary.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    // ---------------------
    // POST /login tests
    // ---------------------

    @Test
    void testLogin_Success() throws Exception {
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(true);

        LoginRequest req = new LoginRequest("john", "1234");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    void testLogin_Fail() throws Exception {
        when(authService.authenticate(any(LoginRequest.class))).thenReturn(false);

        LoginRequest req = new LoginRequest("john", "wrong");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }

    // ---------------------
    // POST /signup tests
    // ---------------------

    @Test
    void testSignup_Success() throws Exception {
        when(authService.register(any(SignupRequest.class))).thenReturn(true);

        SignupRequest req = new SignupRequest(
                "John", "Doe", "j@j.com", "john", "1234"
        );

        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    void testSignup_Fail() throws Exception {
        when(authService.register(any(SignupRequest.class))).thenReturn(false);

        SignupRequest req = new SignupRequest(
                "John", "Doe", "j@j.com", "john", "1234"
        );

        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }
}
