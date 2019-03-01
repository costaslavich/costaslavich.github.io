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

//  REFS

const refs = {
  list: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
  editorInput: document.querySelector('.note-editor input'),
  filter: document.querySelector('.search-form__input'),
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

//  CLASS

class Notepad {
  static getPriorityName(priorityId) {
    return Notepad.PRIORITIES[priorityId];
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
      priority: Notepad.PRIORITIES,
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
      note => note.priority === priority
    );

    return newArrayNotesByPriority;
  }
}

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

const notepad = new Notepad(initialNotes);

//  UI
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

  listRef.innerHTML = '';
  listRef.append(...listItems);
};

const addItemToList = (listRef, item) => {
  const listItem = createListItem(item);

  listRef.appendChild(listItem);
};

//  HANDLERS

const handleEditorSubmit = event => {
  event.preventDefault();

  const [input, textarea] = event.currentTarget.elements;

  const inputValue = input.value;
  const textareaValue = textarea.value;

  if (inputValue === '' || textareaValue === '') {
    return alert('Необходимо заполнить все поля !!!');
  }

  const saveItem = notepad.saveNote(inputValue, textareaValue);

  addItemToList(refs.list, saveItem);

  event.currentTarget.reset();
};

const handleFilterChange = event => {
  const filteredItems = notepad.filterNotesByQuery(event.target.value);

  renderNoteList(refs.list, filteredItems);
};

const removeListItem = element => {
  const parentListItem = element.closest('.note-list__item');
  const id = parentListItem.dataset.id;

  notepad.deleteNote(id);
  parentListItem.remove();
};

const handleListClick = ({ target }) => {
  if (target.nodeName !== 'I') return;

  const actionIcon = target.textContent;

  switch (actionIcon) {
    case ICON_TYPES.DELETE:
      console.log('DElETE !!!');
      removeListItem(target);
      break;

    case ICON_TYPES.EDIT:
      console.log('EDIT !!!');
      break;

    default:
      console.log('invalid action !!!');
  }
};

renderNoteList(refs.list, notepad.notes);

//  LISTENERS

refs.editor.addEventListener('submit', handleEditorSubmit);
refs.filter.addEventListener('input', handleFilterChange);
refs.list.addEventListener('click', handleListClick);
