"use client";

import { useState, useEffect } from "react";
import { NoteCard } from "@/components/molecules/note-card";
import { NoteForm } from "@/components/organisms/note-form";
import { Button } from "@/components/atoms/button";

interface Note {
  id: string;
  content: string;
  color?: string;
  date?: string;
}

const API_URL = "/api/notes";

export function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loadingSelected, setLoadingSelected] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      setNotes(data);
    }
    setLoading(false);
  };

  const handleNoteClick = async (noteId: string) => {
    setLoadingSelected(true);
    const response = await fetch(`${API_URL}/${noteId}`);
    if (response.ok) {
      const data = await response.json();
      setSelectedNote(data);
    }
    setLoadingSelected(false);
  };

  const handleUpdateNote = async (updatedNote: {
    content: string;
    color: string;
  }) => {
    if (!selectedNote) return;

    const response = await fetch(`${API_URL}/${selectedNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: updatedNote.content,
        color: updatedNote.color,
      }),
    });

    if (response.ok) {
      await fetchNotes();
      setSelectedNote(null);
    }
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }

    const response = await fetch(`${API_URL}/${selectedNote.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await fetchNotes();
      setSelectedNote(null);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading notes...</p>;
  }

  if (notes.length === 0) {
    return (
      <p className="text-center py-12 text-gray-600">
        No notes yet. Add your first note!
      </p>
    );
  }

  return (
    <div className="flex gap-6">
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max list-none flex-1">
        {notes.map((note) => (
          <li key={note.id}>
            <NoteCard
              content={note.content}
              color={note.color}
              date={note.date}
              onClick={() => handleNoteClick(note.id)}
            />
          </li>
        ))}
      </ul>

      {selectedNote && (
        <aside className="w-96 sticky top-0 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Edit Note</h2>
            <button
              onClick={() => setSelectedNote(null)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close editor"
            >
              ✕
            </button>
          </div>
          {loadingSelected ? (
            <p className="text-gray-600">Loading note...</p>
          ) : (
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <NoteForm
                onSubmit={handleUpdateNote}
                initialContent={selectedNote.content}
                initialColor={selectedNote.color}
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button onClick={handleDeleteNote} variant="danger">
                  Delete Note
                </Button>
              </div>
            </section>
          )}
        </aside>
      )}
    </div>
  );
}
