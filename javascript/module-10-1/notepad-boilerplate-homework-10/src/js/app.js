import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from './utils/constants';
import initialNotes from './initial-notes';
import Notepad from './notepad-model';
import {
  createListItem,
  createNoteContent,
  createNoteFooter,
  createNotePriority,
  createNoteAction,
  renderNoteList,
  addItemToList,
} from './view';

//  REFS

const refs = {
  list: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
  editorInput: document.querySelector('.note-editor input'),
  filter: document.querySelector('.search-form__input'),
};

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

const notepad = new Notepad(initialNotes);

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
