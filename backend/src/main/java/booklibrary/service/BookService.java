package booklibrary.service;

import booklibrary.dto.BookDTO;
import booklibrary.entity.Book;
import booklibrary.entity.Genre;
import booklibrary.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Long bookId) {
        return bookRepository.findById(bookId);
    }

    public List<Book> searchBooks(String query) {
        return bookRepository.findByTitleContainingIgnoreCase(query);
    }

    public Book createBook(BookDTO book) {
        Book bookEntity = new Book();
        bookEntity.setTitle(book.getTitle());
        bookEntity.setAuthor(book.getAuthor());
        bookEntity.setFormat(book.getFormat());
        bookEntity.setDetails(book.getDetails());
        bookEntity.setDescription(book.getDescription());
        bookEntity.setPublishDate(book.getPublishDate());
        bookEntity.setCoverURL(book.getCoverURL());
        bookEntity.setPages(book.getPages());
        bookEntity.setRating(book.getRating());
        bookEntity.setStatus(book.getStatus());
        System.out.println(bookEntity.toString());
        return bookRepository.save(bookEntity);
    }
}
