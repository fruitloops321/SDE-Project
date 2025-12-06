package booklibrary.controller;

import booklibrary.dto.ReadingListDTO;
import booklibrary.entity.ReadingList;
import booklibrary.service.ReadingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reading-list")
@CrossOrigin(origins = "http://localhost:5173")
public class ReadingListController {

    private final ReadingListService readingListService;

    @Autowired
    public ReadingListController(ReadingListService readingListService) {
        this.readingListService = readingListService;
    }

    @GetMapping("/users/{userId}")
    public ReadingList getReadingList(@PathVariable Long userId) {
        return readingListService.getReadingListForUser(userId);
    }

    @PutMapping("/users/{userId}/{bookId}")
    public ReadingList addToReadingList(@PathVariable Long userId,
                                        @PathVariable Long bookId) {
        return readingListService.addToReadingList(
                userId,
                bookId
        );
    }

    @PostMapping
    public ReadingList addReadingList(@RequestBody ReadingListDTO readingList) {
        return readingListService.addReadingList(readingList);
    }

    @DeleteMapping("/{entryId}")
    public void removeFromReadingList(@PathVariable Long entryId) {
        readingListService.removeFromReadingList(entryId);
    }
}
