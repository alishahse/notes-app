import React, { useState } from 'react';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';

const Notes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState([]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title || !description || !date) return;

    const newNote = {
      id: Date.now(),
      title,
      description,
      date,
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <div className="notes-container">
      <form onSubmit={handleAddNote} className="notes-form">
        <h3>Add Note</h3>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777' }}>No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              {/* ⭐ Favorite icon - top right */}
              <FaStar title="Favorite" className="icon favorite-icon" />

              {/* Note content */}
              <h4>{note.title}</h4>
              <p>{note.description}</p>
              <p className="note-date">📅 {note.date}</p>

              {/* 🖊️ Edit + 🗑️ Delete icons - bottom right */}
              <div className="note-actions-bottom">
                <FaEdit title="Edit" className="icon edit" />
                <FaTrash title="Delete" className="icon delete" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;


