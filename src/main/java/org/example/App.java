package org.example;

import java.io.IOException;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class App extends Application {

    @Override
    public void start(Stage stage) throws IOException {
        var loader = new FXMLLoader(getClass().getResource("main.fxml"));
        //var loader2 = new FXMLLoader(getClass().getResource("signup.fxml"));
        //var loader3 = new FXMLLoader(getClass().getResource("resetPassword.fxml"));

        var scene = new Scene(loader.load());
        //var scene2 = new Scene(loader2.load());
        //var scene3 = new Scene(loader3.load());

        scene.getStylesheets().add(getClass().getResource("style.css").toExternalForm());
        //scene.getStylesheets().add("style.css");


        stage.setScene(scene );
        stage.setTitle("MyApp");
        stage.show();
    }

}
