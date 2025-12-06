package booklibrary.service;

import booklibrary.dto.ReadingListDTO;
import booklibrary.entity.*;
import booklibrary.repository.BookRepository;
import booklibrary.repository.ReadingListRepository;
import booklibrary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ReadingListService {

    private final ReadingListRepository readingListRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Autowired
    public ReadingListService(ReadingListRepository readingListRepository, UserRepository userRepository, BookRepository bookRepository) {
        this.readingListRepository = readingListRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public ReadingList getReadingListForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return readingListRepository.findByUser(user);
    }

    public ReadingList addReadingList(ReadingListDTO readingList) {
        User user = userRepository.findById(readingList.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        ReadingList readingListEntity = new ReadingList();
        readingListEntity.setUser(user);
        return readingListRepository.save(readingListEntity);
    }

    public ReadingList addToReadingList(Long userId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        ReadingList readingList = readingListRepository.findByUser(user);
        Set<Book> bookSet = new HashSet<>();
        bookSet.add(book);

        readingList.setBook(bookSet);

        return readingListRepository.save(readingList);
    }

    public void removeFromReadingList(Long entryId) {
        readingListRepository.deleteById(entryId);
    }
}
