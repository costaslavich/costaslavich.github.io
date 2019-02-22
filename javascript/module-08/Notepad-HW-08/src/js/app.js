'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const refs = {
  list: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
};

const initialNotes = [
  {
    id: 1,
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 2,
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 4,
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
  static getPriorityName(priorityId) {
    const notes = Notepad.PRIORITIES;

    for (const key in notes) {
      if (notes[key].id === priorityId) {
        return notes[key].name;
      }
    }
  }

  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    for (const note of this.notes) {
      if (note.id === id) {
        return note;
      }
    }
  }

  saveNote(note) {
    this.notes.push(note);
  }

  deleteNote(id) {
    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this.notes[i];

      if (note.id === id) {
        this.notes.splice(i, 1);
      }
    }
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
      const arrayWordsTitle = note.title.toLowerCase().split(' ');
      const arrayWordsBody = note.body.toLowerCase().split(' ');

      if (arrayWordsTitle.includes(query) || arrayWordsBody.includes(query)) {
        newArrayNotes.push(note);
      }
    }
    return newArrayNotes;
  }

  filterNotesByPriority(priority) {
    const newArrayNotesByPriority = [];
    for (const note of this.notes) {
      if (note.priority === priority) {
        newArrayNotesByPriority.push(note);
      }
    }
    return newArrayNotesByPriority;
  }
}

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const notepad = new Notepad(initialNotes);

const handleEditorSubmit = event => {
  event.preventDefault();

  const [inputFields] = event.target.elements;
  console.log(inputFields);
};

refs.editor.addEventListener('submit', handleEditorSubmit);

const createListItem = ({ id, title, body, priority }) => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  const notice = document.createElement('div');
  notice.classList.add('note');

  notice.append(createNoteContent(title, body), createNoteFooter(priority));
  listItem.appendChild(notice);

  return listItem;
};

const createNoteContent = (title, body) => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;
  noteContent.append(noteTitle, noteBody);

  return noteContent;
};

const createNoteFooter = priority => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  noteFooter.append(createNotePriority(priority), createNoteAction());

  return noteFooter;
};

const createNotePriority = priority => {
  const noteSectionPriority = document.createElement('section');
  noteSectionPriority.classList.add('note_section');

  const buttonDecrease = document.createElement('button');
  buttonDecrease.classList.add('action');
  buttonDecrease.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;

  const iconDecrease = document.createElement('i');
  iconDecrease.classList.add('material-icons');
  iconDecrease.classList.add('action__icon');
  iconDecrease.textContent = ICON_TYPES.ARROW_DOWN;
  buttonDecrease.appendChild(iconDecrease);

  const buttonIncrease = document.createElement('button');
  buttonIncrease.classList.add('action');
  buttonIncrease.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;

  const iconIncrease = document.createElement('i');
  iconIncrease.classList.add('material-icons');
  iconIncrease.classList.add('action__icon');
  iconIncrease.textContent = ICON_TYPES.ARROW_UP;
  buttonIncrease.appendChild(iconIncrease);

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = 'Priority: ' + Notepad.getPriorityName(priority);

  noteSectionPriority.append(buttonDecrease, buttonIncrease, notePriority);

  return noteSectionPriority;
};

const createNoteAction = () => {
  const noteSectionAction = document.createElement('section');
  noteSectionAction.classList.add('note__section');

  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('action');
  buttonEdit.dataset.action = NOTE_ACTIONS.EDIT;

  const iconEdit = document.createElement('i');
  iconEdit.classList.add('material-icons');
  iconEdit.classList.add('action__icon');
  iconEdit.textContent = ICON_TYPES.EDIT;
  buttonEdit.appendChild(iconEdit);

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('action');
  buttonDelete.dataset.action = NOTE_ACTIONS.DELETE;

  const iconDelete = document.createElement('i');
  iconDelete.classList.add('material-icons');
  iconDelete.classList.add('action__icon');
  iconDelete.textContent = ICON_TYPES.DELETE;
  buttonDelete.appendChild(iconDelete);

  noteSectionAction.append(buttonEdit, buttonDelete);

  return noteSectionAction;
};

const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));

  listRef.append(...listItems);
};

renderNoteList(refs.list, notepad.notes);
