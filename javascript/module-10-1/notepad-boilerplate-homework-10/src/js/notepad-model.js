export default class Notepad {
  static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId].name;
  }

  static generateUniqueId = () =>
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    const noteId = this._notes.find(note => note.id === id);

    return noteId;
  }

  saveNote(headline, text) {
    const newItem = {
      id: Notepad.generateUniqueId(),
      title: headline,
      body: text,
      priority: PRIORITY_TYPES.LOW,
    };

    this.notes.push(newItem);

    return newItem;
  }

  deleteNote(id) {
    this._notes = this._notes.filter(note => note.id !== id);
  }

  updateNoteContent(id, updateContent) {
    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this.notes[i];
      const updateNote = { ...note, ...updateContent };

      if (note.id === id) {
        return this.notes.splice(i, 1, updateNote);
      }
    }
  }

  updateNotePriority(id, priority) {
    for (const note of this.notes) {
      if (note.id === id) {
        note.priority = priority;
        return note.priority;
      }
    }
  }

  filterNotesByQuery(query) {
    const newArrayNotes = [];
    for (const note of this.notes) {
      const arrayWordsTitle = note.title.toLowerCase();
      const arrayWordsBody = note.body.toLowerCase();

      if (arrayWordsTitle.includes(query) || arrayWordsBody.includes(query)) {
        newArrayNotes.push(note);
      }
    }
    return newArrayNotes;
  }

  filterNotesByPriority(priority) {
    const newArrayNotesByPriority = this._notes.filter(
      note => note.priority === priority,
    );

    return newArrayNotesByPriority;
  }
}
