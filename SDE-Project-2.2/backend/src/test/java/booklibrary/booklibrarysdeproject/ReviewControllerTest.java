package booklibrary.booklibrarysdeproject;


import booklibrary.controller.ReviewController;
import booklibrary.dto.ReviewDTO;
import booklibrary.entity.Review;
import booklibrary.service.ReviewService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReviewController.class)
class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReviewService reviewService;

    @Autowired
    private ObjectMapper objectMapper;

    // -------------------------
    // POST /api/books/{bookId}/reviews
    // -------------------------

    @Test
    void testAddReview() throws Exception {
        Long bookId = 5L;

        ReviewDTO dto = new ReviewDTO(1L, "Great book!", 5);
        Review response = new Review(1L, bookId, "Great book!", 5);

        when(reviewService.addReview(
                anyLong(), anyLong(), anyString(), anyInt()
        )).thenReturn(response);

        mockMvc.perform(post("/api/books/{bookId}/reviews", bookId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.bookId").value(5))
                .andExpect(jsonPath("$.content").value("Great book!"))
                .andExpect(jsonPath("$.rating").value(5));
    }

    // -------------------------
    // GET /api/books/{bookId}/reviews
    // -------------------------

    @Test
    void testGetReviews() throws Exception {
        Long bookId = 10L;

        List<Review> reviews = List.of(
                new Review(1L, bookId, "Amazing!", 5),
                new Review(2L, bookId, "Pretty good", 4)
        );

        when(reviewService.getReviewsForBook(bookId)).thenReturn(reviews);

        mockMvc.perform(get("/api/books/{bookId}/reviews", bookId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].content").value("Amazing!"))
                .andExpect(jsonPath("$[0].rating").value(5))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].content").value("Pretty good"))
                .andExpect(jsonPath("$[1].rating").value(4));
    }
}
