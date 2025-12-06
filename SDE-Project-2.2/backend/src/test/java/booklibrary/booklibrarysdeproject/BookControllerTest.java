package booklibrary.booklibrarysdeproject;


import booklibrary.controller.BookController;
import booklibrary.dto.BookDTO;
import booklibrary.entity.Book;
import booklibrary.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookControllerTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookController bookController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBooks() {
        List<Book> mockBooks = Arrays.asList(
                new Book(1L, "Title1", "Author1"),
                new Book(2L, "Title2", "Author2")
        );

        when(bookService.getAllBooks()).thenReturn(mockBooks);

        List<Book> result = bookController.getAllBooks();

        assertEquals(2, result.size());
        verify(bookService, times(1)).getAllBooks();
    }

    @Test
    void testGetBookById_Found() {
        Book book = new Book(1L, "Title", "Author");

        when(bookService.getBookById(1L)).thenReturn(Optional.of(book));

        Book result = bookController.getBookById(1L);

        assertNotNull(result);
        assertEquals("Title", result.getTitle());
        verify(bookService, times(1)).getBookById(1L);
    }

    @Test
    void testGetBookById_NotFound() {
        when(bookService.getBookById(99L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                bookController.getBookById(99L)
        );

        assertEquals("Book not found", ex.getMessage());
    }

    @Test
    void testCreateBook() {
        BookDTO dto = new BookDTO("New Book", "Author");
        Book saved = new Book(1L, "New Book", "Author");

        when(bookService.createBook(dto)).thenReturn(saved);

        Book result = bookController.createBook(dto);

        assertEquals("New Book", result.getTitle());
        verify(bookService, times(1)).createBook(dto);
    }
}

