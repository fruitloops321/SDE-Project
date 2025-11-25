package booklibrary.config;

import booklibrary.entity.User;
import booklibrary.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadData(UserRepository userRepository) {
        return args -> {

            // Only create a user if the table is empty
            if (userRepository.count() == 0) {
                User user =  new User("123456", "linahamza", "Hamza", "Lina");
                userRepository.save(user);

                System.out.println("✔ Default user created!");
            }
        };
    }
}

