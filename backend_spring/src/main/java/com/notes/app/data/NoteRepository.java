package com.notes.app.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Notice: We're using the 
// Decorator design pattern
// We didn't cover it but it
// is another common dp
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
  List<Note> findAllByOrderByCreatedAtDesc();
}
