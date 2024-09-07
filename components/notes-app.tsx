"use client";
import { useState } from "react";
import { Plus, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Component() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const addNote = () => {
    if (newNoteTitle.trim() === "") return;
    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: "",
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
    setNewNoteTitle("");
  };

  const updateNote = (id: number, content: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
    setActiveNote(updatedNotes.find((note) => note.id === id) || null);
  };

  const deleteNote = (id: number) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    setActiveNote(null);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      {/* Sidebar */}
      <div className="w-80 backdrop-blur-md bg-gray-800/30 border-r border-gray-700/30">
        <div className="p-6">
          <div className="flex mb-6">
            <Input
              type="text"
              placeholder="New note title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="flex-grow mr-2 bg-gray-700/30 border-gray-600/30 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-gray-500"
            />
            <Button
              onClick={addNote}
              size="icon"
              className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeNote?.id === note.id
                    ? "bg-gray-700/40"
                    : "hover:bg-gray-700/20"
                }`}
                onClick={() => setActiveNote(note)}
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="truncate text-gray-200">{note.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="text-gray-400 hover:text-gray-200 hover:bg-gray-600/30 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow p-8 backdrop-blur-md bg-gray-800/20">
        {activeNote ? (
          <div className="h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              {activeNote.title}
            </h2>
            <Textarea
              className="flex-grow resize-none bg-gray-700/30 border-gray-600/30 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 rounded-lg"
              placeholder="Start typing your note here..."
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, e.target.value)}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a note or create a new one to get started
          </div>
        )}
      </div>
    </div>
  );
}
