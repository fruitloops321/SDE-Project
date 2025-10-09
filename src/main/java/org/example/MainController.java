package org.example;

import javafx.fxml.FXML;

import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.event.ActionEvent;

import org.example.Model.SceneSwitch;

import java.io.IOException;


public class MainController {
    // Login Page
    @FXML
    private AnchorPane loginPage;

    @FXML
    private TextField passwordFill;

    @FXML
    private TextField usernameFill;

    @FXML
    private void ForgetPass(ActionEvent event) throws IOException {
        new SceneSwitch(loginPage, "resetPassword.fxml");
    }

    @FXML
    private void signUp() throws IOException {
        new SceneSwitch(loginPage, "signUp.fxml");
    }


    // Sign-Up Page
    @FXML
    private AnchorPane signUpPage;

    @FXML
    void onLogin() throws IOException {
        new SceneSwitch(signUpPage, "main.fxml");

    }

    // Reset Password Page

    @FXML
    private AnchorPane passwordResetPage;

    @FXML
    private TextField usernameFillFromPasswordReset;

    @FXML
    void signUpFromPasswordReset1() throws IOException {
        new SceneSwitch(passwordResetPage, "signUp.fxml");

    }

    @FXML
    void signUpFromPasswordReset2() throws IOException{
        new SceneSwitch(passwordResetPage, "signUp.fxml");
    }

}
