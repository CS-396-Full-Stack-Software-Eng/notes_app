"use client";

import { Heading } from "@/components/atoms/heading";
import { IconButton } from "@/components/atoms/icon-button";

interface SidebarProps {
  onAddNote: () => void;
}

export function Sidebar({ onAddNote }: SidebarProps) {
  return (
    <aside className="w-20 h-screen bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-6">
      <Heading level={2} className="text-sm font-semibold">
        Notes
      </Heading>

      <IconButton
        onClick={onAddNote}
        ariaLabel="Add new note"
        variant="primary"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </IconButton>
    </aside>
  );
}
