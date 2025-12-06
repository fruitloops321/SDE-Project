package booklibrary.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    
    private Long id;
    private String content;
    private Integer rating;

    public ReviewDTO(long l, String s, int i) {
    }
}
