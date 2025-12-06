package booklibrary.dto;

import booklibrary.entity.Genre;
import booklibrary.entity.ReadingStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

public class BookDTO {
    private int id;
    private String title;
    private String author;
    private Set<Genre> genre;
    private LocalDate PublishDate;
    private String Description;
    private String Details;
    private double Rating;
    private String Format;
    private int Pages;
    private String coverURL;
    private ReadingStatus status;

    public BookDTO(String newBook, String author) {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Set<Genre> getGenre() {
        return genre;
    }

    public void setGenre(Set<Genre> genre) {
        this.genre = genre;
    }

    public LocalDate getPublishDate() {
        return PublishDate;
    }

    public void setPublishDate(LocalDate publishDate) {
        PublishDate = publishDate;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getDetails() {
        return Details;
    }

    public void setDetails(String details) {
        Details = details;
    }

    public double getRating() {
        return Rating;
    }

    public void setRating(double rating) {
        Rating = rating;
    }

    public String getFormat() {
        return Format;
    }

    public void setFormat(String format) {
        Format = format;
    }

    public int getPages() {
        return Pages;
    }

    public void setPages(int pages) {
        Pages = pages;
    }

    public String getCoverURL() {
        return coverURL;
    }

    public void setCoverURL(String coverURL) {
        this.coverURL = coverURL;
    }

    public ReadingStatus getStatus() {
        return status;
    }

    public void setStatus(ReadingStatus status) {
        this.status = status;
    }
}
