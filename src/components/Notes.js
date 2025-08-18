import React, { useState, useEffect } from "react";
import { getNotes, addNote } from "../services/api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // ✅ Colors array for note cards
  const colors = ["#FFC0CB", "#ADD8E6", "#90EE90", "#FFD700", "#FFA07A", "#DDA0DD"];

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getNotes();
      console.log("Fetched notes:", data); // 🔍 check property names
      setNotes(Array.isArray(data) ? data : data.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };
  fetchData();
}, []);
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newNote = await addNote(description, date);
      // Make sure we add the actual note object
      const noteToAdd = newNote._id ? newNote : newNote.note || newNote;
      setNotes([noteToAdd, ...notes]);
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleAdd}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Note description"
          rows={3}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* ✅ Notes container with 2-row layout */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes.length > 0 ? (
      notes.map((note, index) => (
  <div
    key={note._id}
    style={{
      backgroundColor: colors[index % colors.length],
      padding: "10px",
      margin: "10px",
      borderRadius: "8px",
      width: "200px",
    }}
  >
    {/* Check for description, text, or note */}
    <p>{note.description || note.text || note.note}</p>
    <p>{note.date}</p>
  </div>
))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
};

export default Notes;

