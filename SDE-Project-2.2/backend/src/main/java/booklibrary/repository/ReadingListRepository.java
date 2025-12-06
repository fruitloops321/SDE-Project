package booklibrary.repository;

import booklibrary.entity.ReadingList;
import booklibrary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReadingListRepository extends JpaRepository<ReadingList, Long> {

    ReadingList findByUser(User user);
}
