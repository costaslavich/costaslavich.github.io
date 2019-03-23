import { PRIORITIES } from './constants';

const shortid = require('shortid');

export default class Notepad {
  static getPriorityName(priorityId) {
    Notepad.PRIORITIES = PRIORITIES;
    return PRIORITIES[priorityId].name;
  }

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
      id: shortid.generate(),
      title: headline,
      body: text,
      priority: Notepad.getPriorityName(0),
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

  filterNotesByQuery(query = '') {
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
