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

const API_URL = "http://localhost:8000/api/notes";

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = () => {
    router.push("/add");
  };

  const handleNoteClick = (noteId: string) => {
    router.push(`/edit/${noteId}`);
  };

  if (loading) {
    return (
      <>
        <Sidebar onAddNote={handleAddNote} />
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <Header title="Notes" />
          <p className="text-gray-600">Loading notes...</p>
        </main>
      </>
    );
  }

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
