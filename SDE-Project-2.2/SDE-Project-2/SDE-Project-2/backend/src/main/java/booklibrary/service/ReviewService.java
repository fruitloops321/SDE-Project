package booklibrary.service;

import booklibrary.entity.*;
import booklibrary.repository.BookRepository;
import booklibrary.repository.ReviewRepository;
import booklibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, BookRepository bookRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public Review addReview(Long userId, Long bookId, String content, Integer rating) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Review review = new Review();
        review.setUser(user);
        review.setBook(book);
        review.setContent(content);
        review.setRating(rating);

        return reviewRepository.save(review);
    }

    public List<Review> getReviewsForBook(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return reviewRepository.findByBook(book);
    }
}
