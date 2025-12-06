package booklibrary.controller;

import booklibrary.dto.ReviewDTO;
import booklibrary.entity.Review;
import booklibrary.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/{bookId}/reviews")
    public Review addReview(@PathVariable Long bookId,
                            @RequestBody ReviewDTO request) {
        return reviewService.addReview(
                request.getId(),
                bookId,
                request.getContent(),
                request.getRating()
        );
    }

    @GetMapping("/{bookId}/reviews")
    public List<Review> getReviews(@PathVariable Long bookId) {
        return reviewService.getReviewsForBook(bookId);
    }
}
