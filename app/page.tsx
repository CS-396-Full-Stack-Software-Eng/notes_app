"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/organisms/sidebar";
import { NotesList } from "@/components/organisms/notes-list";
import { Header } from "@/components/organisms/header";

interface Note {
  id: string;
  content: string;
  color?: string;
  date?: string;
}

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>(() => {
    // Initialize state from localStorage
    if (typeof window !== "undefined") {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    }
    return [];
  });

  // Refresh notes when window gains focus (user returns from add page)
  useEffect(() => {
    const handleFocus = () => {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleAddNote = () => {
    router.push("/add");
  };

  const handleNoteClick = (noteId: string) => {
    router.push(`/edit/${noteId}`);
  };

  return (
    <>
      <Sidebar onAddNote={handleAddNote} />

      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <Header title="Notes" />

        <NotesList notes={notes} onNoteClick={handleNoteClick} />
      </main>
    </>
  );
}
