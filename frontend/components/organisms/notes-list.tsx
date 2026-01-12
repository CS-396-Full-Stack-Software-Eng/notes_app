import { NoteCard } from "@/components/molecules/note-card";

interface Note {
  id: string;
  content: string;
  color?: string;
  date?: string;
}

interface NotesListProps {
  notes: Note[];
  onNoteClick?: (noteId: string) => void;
}

export function NotesList({ notes, onNoteClick }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-center py-12 text-gray-600">
        No notes yet. Add your first note!
      </p>
    );
  }

  return (
    <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max list-none">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard
            content={note.content}
            color={note.color}
            date={note.date}
            onClick={onNoteClick ? () => onNoteClick(note.id) : undefined}
          />
        </li>
      ))}
    </ul>
  );
}
