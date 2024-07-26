import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/notes');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  const handleCreateNote = async (title, content) => {
    setLoading(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
      setNotes([...notes, data]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (id, title, content) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
      setNotes(notes.map((note) => (note.id === id ? data : note)));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    setLoading(true);
    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Note Maker</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const content = event.target.content.value;
        handleCreateNote(title, content);
        event.target.title.value = '';
        event.target.content.value = '';
      }}>
        <input type="text" name="title" placeholder="Title" />
        <textarea name="content" placeholder="Content" />
        <button type="submit">Create Note</button>
      </form>
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleUpdateNote(note.id, note.title, note.content)}>Edit</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

ReactDOM.render(<NoteList />, document.getElementById('app'));