package com.notes.app.service;

import com.notes.app.data.Note;
import com.notes.app.data.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    // This is dependency injection
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    public Note createNote(String content, String color) {
        // Should we do this?
        // Note note = new Note(content, color);
        return noteRepository.save(new Note(content, color));
    }

    public Optional<Note> updateNote(Long id, String content, String color) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setContent(content);
                    if (color != null) {
                        note.setColor(color);
                    }
                    return noteRepository.save(note);
                });
    }

    public boolean deleteNote(Long id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
