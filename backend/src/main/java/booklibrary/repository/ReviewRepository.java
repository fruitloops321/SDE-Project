package booklibrary.repository;

import booklibrary.entity.Book;
import booklibrary.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByBook(Book book);
}
