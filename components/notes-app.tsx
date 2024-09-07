"use client";
import { useState } from "react";
import { PlusCircle, FileText, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Component() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-black/20 border-r border-white/10">
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="New note title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="flex-grow bg-white/10 border-white/20 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-sky-500"
            />
            <Button
              onClick={addNote}
              size="icon"
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border-white/20 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 pl-10"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2 pr-2">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${activeNote?.id === note.id
                    ? "bg-sky-700/40"
                    : "hover:bg-sky-700/20"
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
          </ScrollArea>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow p-8 bg-black/10">
        {activeNote ? (
          <div className="h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">
              {activeNote.title}
            </h2>
            <Textarea
              className="flex-grow resize-none bg-white/10 border-white/20 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 rounded-lg"
              placeholder="Start typing your note here..."
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, e.target.value)}
            />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <FileText className="h-16 w-16 text-sky-400" />
            <p className="text-xl">Select a note or create a new one to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
