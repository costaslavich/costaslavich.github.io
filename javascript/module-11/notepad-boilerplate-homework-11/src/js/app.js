import Notyf from 'notyf';
import Micromodal from 'micromodal';
import productTemplate from '../templates/notes.hbs';
import { ICON_TYPES, NOTIFICATION_MESSAGES, refs } from './utils/constants';
import Notepad from './utils/notepad-model';
import initialNotes from '../assets/notes.json';
import {
  renderNoteList,
  addItemToList,
  removeListItem,
  findParentListItem,
} from './utils/view';
import '../sass/libs/micromodal.scss';
import 'notyf/dist/notyf.min.css';

// const initialNotesCopyPriority = initialNotes.map(note=>{
// note.priority = Notepad.getPriorityName();
// })

const createNoteMarkup = notes => {
  const markup = notes.map(note => productTemplate(note)).join('');

  return markup;
};

const markup = createNoteMarkup(initialNotes);

refs.list.insertAdjacentHTML('beforeend', markup);

const notepad = new Notepad(initialNotes);
const notyf = new Notyf();

//  HANDLERS

const handleEditorSubmit = event => {
  event.preventDefault();

  const [input, textarea] = event.currentTarget.elements;

  const inputValue = input.value;
  const textareaValue = textarea.value;

  if (inputValue === '' || textareaValue === '') {
    return notyf.alert(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
  }

  const saveItem = notepad.saveNote(inputValue, textareaValue);

  addItemToList(refs.list, saveItem);

  notyf.confirm(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
  Micromodal.close('note-editor-modal');

  event.currentTarget.reset();
};

const handleFilterChange = event => {
  const filteredItems = notepad.filterNotesByQuery(event.target.value);

  renderNoteList(refs.list, filteredItems);
};

const handleListClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;

  const actionIcon = target.textContent;

  console.log(actionIcon);
  switch (actionIcon) {
    case ICON_TYPES.DELETE:
      console.log('DElETE !!!');
      const listItem = findParentListItem(target);

      notepad.deleteNote(listItem.dataset.id);
      notyf.confirm(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
      removeListItem(listItem);

      break;

    case ICON_TYPES.EDIT:
      console.log('EDIT !!!');
      break;

    case ICON_TYPES.ARROW_UP:
      console.log('Priority HIGH !!!');
      break;

    case ICON_TYPES.ARROW_DOWN:
      console.log('Priority LESS !!!');
      break;

    default:
    // console.log('invalid action !!!');
  }
};

const handleOpenModal = () => {
  Micromodal.show('note-editor-modal');
};

//renderNoteList(refs.list, notepad.notes);

//  LISTENERS

refs.editor.addEventListener('submit', handleEditorSubmit);
refs.filter.addEventListener('input', handleFilterChange);
refs.list.addEventListener('click', handleListClick);
refs.openModalBtn.addEventListener('click', handleOpenModal);
