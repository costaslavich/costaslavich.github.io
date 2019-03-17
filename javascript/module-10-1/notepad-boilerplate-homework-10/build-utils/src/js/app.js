import { ICON_TYPES, refs } from './utils/constants';
import Notepad from './utils/notepad-model';
import initialNotes from '../assets/notes.json';
import { renderNoteList, addItemToList } from './utils/view';

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
