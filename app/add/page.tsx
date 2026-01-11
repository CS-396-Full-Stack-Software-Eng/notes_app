"use client";

import { useRouter } from "next/navigation";
import { NoteForm } from "@/components/organisms/note-form";
import { Header } from "@/components/organisms/header";

interface Note {
  id: string;
  content: string;
  color?: string;
  date?: string;
}

export default function AddNotePage() {
  const router = useRouter();

  const handleAddNote = (note: { content: string; color: string }) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: note.content,
      color: note.color,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    // Get existing notes from localStorage
    const existingNotes = localStorage.getItem("notes");
    const notes: Note[] = existingNotes ? JSON.parse(existingNotes) : [];

    // Add new note to the beginning
    const updatedNotes = [newNote, ...notes];

    // Save back to localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Navigate back to home page
    router.push("/");
  };

  return (
    <main className="flex-1 p-8 max-w-2xl mx-auto bg-gray-50">
      <Header
        title="Add New Note"
        subtitle="Create a new note with your thoughts and ideas"
        showBackButton
        backHref="/"
      />

      <section className="bg-white p-6 rounded-lg shadow-sm">
        <NoteForm onSubmit={handleAddNote} />
      </section>
    </main>
  );
}
