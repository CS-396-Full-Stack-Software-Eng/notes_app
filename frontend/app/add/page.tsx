"use client";

import { useRouter } from "next/navigation";
import { NoteForm } from "@/components/organisms/note-form";
import { Header } from "@/components/organisms/header";

const API_URL = "http://localhost:8000/api/notes";

export default function AddNotePage() {
  const router = useRouter();

  const handleAddNote = async (note: { content: string; color: string }) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: note.content,
        color: note.color,
      }),
    });

    if (response.ok) {
      router.push("/");
    }
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
