package booklibrary.booklibrarysdeproject;


import booklibrary.entity.Book;
import booklibrary.entity.Review;
import booklibrary.entity.User;
import booklibrary.repository.BookRepository;
import booklibrary.repository.ReviewRepository;
import booklibrary.repository.UserRepository;

import booklibrary.service.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ReviewServiceTest {

    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    private BookRepository bookRepository;

    private ReviewService reviewService;

    @BeforeEach
    void setUp() {
        reviewRepository = mock(ReviewRepository.class);
        userRepository = mock(UserRepository.class);
        bookRepository = mock(BookRepository.class);

        reviewService = new ReviewService(reviewRepository, userRepository, bookRepository);
    }

    // -------------------------
    // addReview()
    // -------------------------

    @Test
    void testAddReview_Success() {
        Long userId = 1L;
        Long bookId = 10L;

        User user = new User();
        user.setId(userId);

        Book book = new Book();
        book.setId(bookId);

        Review savedReview = new Review();
        savedReview.setId(100L);
        savedReview.setUser(user);
        savedReview.setBook(book);
        savedReview.setContent("Great read!");
        savedReview.setRating(5);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(bookRepository.findById(bookId)).thenReturn(Optional.of(book));
        when(reviewRepository.save(any(Review.class))).thenReturn(savedReview);

        Review result = reviewService.addReview(userId, bookId, "Great read!", 5);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("Great read!", result.getContent());
        assertEquals(5, result.getRating());
        assertEquals(user, result.getUser());
        assertEquals(book, result.getBook());
    }

    @Test
    void testAddReview_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                reviewService.addReview(1L, 10L, "Nice!", 4)
        );

        assertEquals("User not found", ex.getMessage());
    }

    @Test
    void testAddReview_BookNotFound() {
        User u = new User();
        u.setId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(u));
        when(bookRepository.findById(10L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                reviewService.addReview(1L, 10L, "Nice!", 4)
        );

        assertEquals("Book not found", ex.getMessage());
    }

    // -------------------------
    // getReviewsForBook()
    // -------------------------

    @Test
    void testGetReviewsForBook_Success() {
        Long bookId = 10L;

        Book book = new Book();
        book.setId(bookId);

        Review r1 = new Review();
        r1.setId(1L);
        r1.setBook(book);

        Review r2 = new Review();
        r2.setId(2L);
        r2.setBook(book);

        when(bookRepository.findById(bookId)).thenReturn(Optional.of(book));
        when(reviewRepository.findByBook(book)).thenReturn(List.of(r1, r2));

        List<Review> result = reviewService.getReviewsForBook(bookId);

        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getId());
        assertEquals(2L, result.get(1).getId());
    }

    @Test
    void testGetReviewsForBook_BookNotFound() {
        when(bookRepository.findById(10L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                reviewService.getReviewsForBook(10L)
        );

        assertEquals("Book not found", ex.getMessage());
    }
}

