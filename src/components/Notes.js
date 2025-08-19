import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notes.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch notes
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setNotes(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          alert("Session expired, please login again");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  }, [token]);

  // Create/Update
  const saveNote = async () => {
    if (!description || !date) return alert("Please enter description & date");

    try {
      if (editId) {
        const res = await axios.put(
          `http://localhost:5000/api/notes/${editId}`,
          { description, date },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes((prev) => prev.map((n) => (n._id === editId ? res.data : n)));
        setEditId(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/notes",
          { description, date },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotes((prev) => [res.data, ...prev]);
      }

      setDescription("");
      setDate("");
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (note) => {
    setDescription(note.description);
    setDate(note.date?.slice(0, 10) || "");
    setEditId(note._id);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="notes-container">
      <div className="header">
        <div className="input-row">
          <input
            type="text"
            placeholder="Write a note..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveNote()}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={saveNote}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <p className="note-text">{note.description}</p>
            <span className="note-date">
              {note.date ? new Date(note.date).toLocaleDateString() : "—"}
            </span>
            <div className="card-actions">
              <button className="btn" onClick={() => startEdit(note)}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
