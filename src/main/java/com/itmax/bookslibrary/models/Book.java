package com.itmax.bookslibrary.models;

public class Book {
    private String id;
    private String author;
    private String title;
    private String cover;

    public Book(String author, String title, String cover) {
        this.author = author;
        this.title = title;
        this.cover = cover;
    }

    public Book(String id, String author, String title, String cover) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.cover = cover;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }
}
