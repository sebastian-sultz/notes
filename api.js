const notes = [];

const getNotes = async () => {
  return notes;
};

const createNote = async (title, content) => {
  const id = Math.random().toString(36).substr(2, 9);
  notes.push({ id, title, content, timestamp: new Date().getTime() });
  return notes.find((note) => note.id === id);
};

const updateNote = async (id, title, content) => {
  const note = notes.find((note) => note.id === id);
  if (note) {
    note.title = title;
    note.content = content;
  }
  return notes.find((note) => note.id === id);
};

const deleteNote = async (id) => {
  notes = notes.filter((note) => note.id !== id);
};

export { getNotes, createNote, updateNote, deleteNote };