// package com.notes.app.model;

// import jakarta.persistence.*;
// import java.time.Instant;
// import java.time.LocalDate;
// import java.time.format.DateTimeFormatter;
// import java.util.Locale;

// @Entity
// @Table(name = "notes")
// public class Note {

// @Id
// private String id;

// @Column(columnDefinition = "TEXT")
// private String content;

// @Column(length = 7)
// private String color = "#FCA5A5";

// private String date;

// @Column(name = "created_at")
// private Instant createdAt;

// @Column(name = "updated_at")
// private Instant updatedAt;

// public Note() {
// }

// public Note(String content, String color) {
// this.content = content;
// this.color = color != null ? color : "#FCA5A5";
// }

// @PrePersist
// protected void onCreate() {
// if (this.id == null) {
// this.id = String.valueOf(System.currentTimeMillis() / 1000.0);
// }
// if (this.date == null) {
// DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy",
// Locale.ENGLISH);
// this.date = LocalDate.now().format(formatter);
// }
// this.createdAt = Instant.now();
// this.updatedAt = Instant.now();
// }

// @PreUpdate
// protected void onUpdate() {
// this.updatedAt = Instant.now();
// }

// // Getters and Setters
// public String getId() {
// return id;
// }

// public void setId(String id) {
// this.id = id;
// }

// public String getContent() {
// return content;
// }

// public void setContent(String content) {
// this.content = content;
// }

// public String getColor() {
// return color;
// }

// public void setColor(String color) {
// this.color = color;
// }

// public String getDate() {
// return date;
// }

// public void setDate(String date) {
// this.date = date;
// }

// public Instant getCreatedAt() {
// return createdAt;
// }

// public Instant getUpdatedAt() {
// return updatedAt;
// }
// }
