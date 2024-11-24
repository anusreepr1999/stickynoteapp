import React, { useState, useEffect } from 'react';
import Note from './Note';

const Dashboard = () => {
 
  const loadNotesFromLocalStorage = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    return savedNotes ? savedNotes : [];
  };

  const [notes, setNotes] = useState(loadNotesFromLocalStorage);

  const addNote = () => {
    const newNote = { id: Date.now(), note: 'New Sticky Note' };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const updateNote = (newText, id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, note: newText } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes)); 
  };

 
  const removeNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="board">

      <button className="add-button" onClick={addNote}>
        Add Note
      </button>

      <div className="note-list">
        {notes.map((note) => (
          <Note
            key={note.id}
            index={note.id}
            onChange={updateNote}
            onRemove={removeNote}
          >
            {note.note}
          </Note>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
