package booklibrary.booklibrarysdeproject;

import booklibrary.dto.BookDTO;
import booklibrary.entity.Book;
import booklibrary.entity.ReadingStatus;
import booklibrary.repository.BookRepository;

import booklibrary.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookServiceTest {

    private BookRepository bookRepository;
    private BookService bookService;

    @BeforeEach
    void setUp() {
        bookRepository = mock(BookRepository.class);
        bookService = new BookService(bookRepository);
    }

    // --------------------------
    // getAllBooks()
    // --------------------------

    @Test
    void testGetAllBooks() {
        Book b1 = new Book();
        b1.setId(1L);

        Book b2 = new Book();
        b2.setId(2L);

        when(bookRepository.findAll()).thenReturn(List.of(b1, b2));

        List<Book> result = bookService.getAllBooks();

        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getId());
        assertEquals(2L, result.get(1).getId());
    }

    // --------------------------
    // getBookById()
    // --------------------------

    @Test
    void testGetBookById_Found() {
        Book book = new Book();
        book.setId(10L);

        when(bookRepository.findById(10L)).thenReturn(Optional.of(book));

        Optional<Book> result = bookService.getBookById(10L);

        assertTrue(result.isPresent());
        assertEquals(10L, result.get().getId());
    }

    @Test
    void testGetBookById_NotFound() {
        when(bookRepository.findById(10L)).thenReturn(Optional.empty());

        Optional<Book> result = bookService.getBookById(10L);

        assertFalse(result.isPresent());
    }

    // --------------------------
    // createBook()
    // --------------------------

    @Test
    void testCreateBook() {
        BookDTO dto = new BookDTO();
        dto.setTitle("Test Title");
        dto.setAuthor("Author Name");
        dto.setFormat("Hardcover");
        dto.setDetails("Some details");
        dto.setDescription("Description...");
        dto.setPublishDate(LocalDate.of(2023, 1, 1));
        dto.setCoverURL("http://test.com/cover.jpg");
        dto.setPages(350);
        dto.setRating(4.5);
        dto.setStatus(ReadingStatus.valueOf("Available"));

        Book savedBook = new Book();
        savedBook.setId(100L);
        savedBook.setTitle("Test Title");

        when(bookRepository.save(any(Book.class))).thenReturn(savedBook);

        Book result = bookService.createBook(dto);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("Test Title", result.getTitle());

        // verify that repository.save() was called
        verify(bookRepository, times(1)).save(any(Book.class));
    }
}
