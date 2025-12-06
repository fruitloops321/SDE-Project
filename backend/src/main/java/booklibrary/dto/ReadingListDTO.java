package booklibrary.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReadingListDTO {
    private Long id;
    private Long userId;
    private LocalDateTime date;
}
