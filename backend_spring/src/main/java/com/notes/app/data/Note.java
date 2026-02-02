package com.notes.app.data;

import jakarta.persistence.*;
import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// This is our Model (MVC)
@Entity
@Table(name = "NOTES")
@EntityListeners(AuditingEntityListener.class)
public class Note {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Long id; // What's the best type for this?

  @Column(name = "CONTENT", columnDefinition = "TEXT")
  private String content;

  // How should we store this?
  @Column(name = "COLOR")
  private String color;

  // Do we need these?
  // Yes! We may want to
  // send this info back to the UI
  // private String date;
  @CreatedDate
  @Column(name = "CREATED_AT")
  private Instant createdAt;

  @LastModifiedDate
  @Column(name = "LAST_MODIFIED")
  private Instant lastModified;

  public Note() {
  }

  // What should we put in this constructor?
  public Note(String content, String color) {
    this.content = content;
    this.color = color;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public Instant getLastModified() {
    return lastModified;
  }

  public void setLastModified(Instant lastModified) {
    this.lastModified = lastModified;
  }

  @Override
  public String toString() {
    return "Note{" +
        "id=" + id +
        ", content='" + content + '\'' +
        ", color='" + color + '\'' +
        ", createdAt=" + createdAt +
        ", lastModified=" + lastModified +
        '}';
  }
}
