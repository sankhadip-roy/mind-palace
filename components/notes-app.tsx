"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from 'lodash/debounce';
import { FileText, Trash2, Search, GripVertical, FilePlus2, Menu } from "lucide-react";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";

interface Note {
  _id: string;
  title: string;
  content: string;
  order: number;
}

export default function Component() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const session = useSession();
  const [localNoteContent, setLocalNoteContent] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // console.log(session); //log

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchNotes();
    }
  }, [session.status]);

  const fetchNotes = async () => {
    const response = await fetch('/api/notes');
    if (response.ok) {
      const data = await response.json();
      setNotes(data.notes);
    }
  };

  const addNote = async () => {
    if (newNoteTitle.trim() === "") return;
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newNoteTitle, content: "" }),
    });
    if (response.ok) {
      const data = await response.json();
      setNotes([...notes, data.note]);
      setActiveNote(data.note);
      setNewNoteTitle("");
      setIsSidebarOpen(false);
    }
    else {
      console.error('Failed to add note:', await response.json());
    }
  };

  const debouncedUpdateNote = useCallback(
    debounce(async (id: string, content: string) => {
      try {
        const response = await fetch(`/api/notes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
        if (!response.ok) {
          throw new Error('Failed to update note');
        }
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }, 1000),
    []
  );

  const handleNoteChange = (content: string) => {
    if (activeNote) {
      setLocalNoteContent(content);
      setNotes(prevNotes => prevNotes.map(note =>
        note._id === activeNote._id ? { ...note, content } : note
      ));
      debouncedUpdateNote(activeNote._id, content);
    }
  };

  useEffect(() => {
    if (activeNote) {
      setLocalNoteContent(activeNote.content);
    }
  }, [activeNote]);

  const deleteNote = async (id: string) => {
    const response = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    if (response.ok) {
      const filteredNotes = notes.filter((note) => note._id !== id);
      setNotes(filteredNotes);
      setActiveNote(null);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReorder = async (reorderedNotes: Note[]) => {
    const updatedNotes = reorderedNotes.map((note, index) => ({ ...note, order: index }));
    setNotes(updatedNotes);
    await fetch('/api/notes/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: updatedNotes.map(note => ({ id: note._id, order: note.order })) }),
    });
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-black/20 border-b border-white/10">
        <Button onClick={toggleSidebar} variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">all notes</h1>
        <div className="w-6"></div> {/* Placeholder for balance */}
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-80 bg-black/20 border-r border-white/10 overflow-hidden transition-all duration-300 ease-in-out`}>
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
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FilePlus2 className="h-5 w-5" />
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
          <ScrollArea className="h-[calc(100vh-200px)] md:h-[calc(100vh-180px)]">
            <Reorder.Group axis="y" onReorder={handleReorder} values={filteredNotes}>
              <div className="space-y-2 pr-2">
                {filteredNotes.map((note) => (
                  <Reorder.Item key={note._id} value={note}>
                    <motion.div
                      layout
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${activeNote?._id === note._id
                        ? "bg-sky-700/40"
                        : "hover:bg-sky-700/20"
                        }`}
                      onClick={() => {
                        setActiveNote(note);
                        setIsSidebarOpen(false);
                      }}
                    >
                      <div className="flex items-center flex-grow">
                        <GripVertical className="h-4 w-4 mr-2 text-gray-400 cursor-move" />
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate text-gray-200">{note.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note._id);
                        }}
                        className="text-gray-400 hover:text-gray-200 hover:bg-gray-600/30 rounded-full ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </div>
            </Reorder.Group>
          </ScrollArea>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4 md:p-8 bg-black/10 overflow-auto">
        {activeNote && (
          <div className="h-full flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">
              {activeNote.title}
            </h2>
            <div className="flex flex-col h-full">
              <Textarea
                className="h-full resize-none bg-white/10 border-white/20 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 rounded-lg"
                placeholder="Start typing your note here..."
                value={localNoteContent}
                onChange={(e) => handleNoteChange(e.target.value)}
              />
            </div>
          </div>
        ) || (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <FileText className="h-16 w-16 text-sky-400" />
              <p className="text-xl text-center">Select a note or create a new one to get started</p>
            </div>
          )}
      </div>
    </div>
  );
}