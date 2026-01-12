import { Sidebar } from "@/components/organisms/sidebar";
import { NotesList } from "@/components/organisms/notes-list";
import { Header } from "@/components/organisms/header";

export default function Home() {
  return (
    <>
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <Header title="Notes" />

        <NotesList />
      </main>
    </>
  );
}
