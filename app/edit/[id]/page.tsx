"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { NoteForm } from "@/components/organisms/note-form";
import { Header } from "@/components/organisms/header";

interface Note {
  id: string;
  content: string;
  color?: string;
  date?: string;
}

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    // Load the note from localStorage
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      const notes: Note[] = JSON.parse(savedNotes);
      const foundNote = notes.find((n) => n.id === params.id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        // Note not found, redirect to home
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [params.id, router]);

  const handleUpdateNote = (updatedNote: { content: string; color: string }) => {
    if (!note) return;

    const updatedNoteData: Note = {
      ...note,
      content: updatedNote.content,
      color: updatedNote.color,
    };

    // Get existing notes from localStorage
    const savedNotes = localStorage.getItem("notes");
    const notes: Note[] = savedNotes ? JSON.parse(savedNotes) : [];

    // Update the note
    const updatedNotes = notes.map((n) => (n.id === note.id ? updatedNoteData : n));

    // Save back to localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Navigate back to home page
    router.push("/");
  };

  if (!note) {
    return (
      <main className="flex-1 bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 max-w-2xl mx-auto bg-gray-50">
      <Header
        title="Edit Note"
        subtitle="Update your note content and color"
        showBackButton
        backHref="/"
      />

      <section className="bg-white p-6 rounded-lg shadow-sm">
        <NoteForm
          onSubmit={handleUpdateNote}
          initialContent={note.content}
          initialColor={note.color}
        />
      </section>
    </main>
  );
}
