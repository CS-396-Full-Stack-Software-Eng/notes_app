"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { NoteForm } from "@/components/organisms/note-form";
import { Header } from "@/components/organisms/header";
import { Button } from "@/components/atoms/button";

interface Note {
  id: string;
  content: string;
  color?: string;
  date?: string;
}

const API_URL = "http://localhost:8000/api/notes";

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNote();
  }, [params.id]);

  const fetchNote = async () => {
    try {
      const response = await fetch(`${API_URL}/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setNote(data);
      } else {
        // Note not found, redirect to home
        router.push("/");
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (updatedNote: { content: string; color: string }) => {
    if (!note) return;

    try {
      const response = await fetch(`${API_URL}/${note.id}`, {
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
        // Navigate back to home page
        router.push("/");
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDeleteNote = async () => {
    if (!note) return;

    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${note.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Navigate back to home page
        router.push("/");
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (loading || !note) {
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

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button
            onClick={handleDeleteNote}
            variant="danger"
          >
            Delete Note
          </Button>
        </div>
      </section>
    </main>
  );
}
