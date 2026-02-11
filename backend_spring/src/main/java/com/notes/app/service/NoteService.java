package com.notes.app.service;

import com.notes.app.data.Note;
import com.notes.app.data.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
  private final NoteRepository noteRepository;

  public NoteService(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  public List<Note> getAllNotes() {
    return noteRepository.findAllByOrderByCreatedAtDesc();
  }

  public Optional<Note> getNoteById(Long noteId) {
    return noteRepository.findById(noteId);
  }

  public Note createNote(String content, String color) {
    // validate content and color
    return noteRepository.save(new Note(content, color));
  }
}
