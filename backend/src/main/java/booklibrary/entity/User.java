package booklibrary.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String firstName;
    private String lastName;

    private String username;
    private String password;

    public User() {
    }

    public User(String password, String username, String lastName, String firstName) {
        this.password = password;
        this.username = username;
        this.lastName = lastName;
        this.firstName = firstName;
    }

}
