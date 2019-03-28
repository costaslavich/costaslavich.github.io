import Notyf from 'notyf';
import Micromodal from 'micromodal';
import productTemplate from '../templates/notes.hbs';
import { NOTIFICATION_MESSAGES, NOTE_ACTIONS } from './utils/constants';
import Notepad from './utils/notepad-model';
import {
  refs,
  renderNoteList,
  addItemToList,
  findParentListItem,
  removeListItem,
} from './utils/view';
import '../sass/libs/micromodal.scss';
import 'notyf/dist/notyf.min.css';

let persistedNotes = localStorage.getItem('notes');
if (persistedNotes) {
  persistedNotes = JSON.parse(persistedNotes);
}

const initialNotes = persistedNotes ? persistedNotes : [];

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

  notepad.saveNote(inputValue, textareaValue).then(saveItem => {
    addItemToList(refs.list, saveItem);
  });

  notyf.confirm(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);

  Micromodal.close('note-editor-modal');
  event.currentTarget.reset();
};

const handleFilterChange = ({ target }) => {
  notepad.filterNotesByQuery(target.value).then(note => {
    renderNoteList(refs.list, note.map(item => productTemplate(item)));
  });
};

const handleListClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;

  const actionIcon = target.parentNode.dataset.action;

  switch (actionIcon) {
    case NOTE_ACTIONS.DELETE:
      const listItem = findParentListItem(target);

      notepad
        .deleteNote(listItem.dataset.id)
        .then(() => removeListItem(listItem));
      notyf.confirm(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);

      break;

    case NOTE_ACTIONS.EDIT:
      notyf.confirm(NOTE_ACTIONS.EDIT);
      break;

    case NOTE_ACTIONS.INCREASE_PRIORITY:
      notyf.alert(NOTE_ACTIONS.INCREASE_PRIORITY);
      break;

    case NOTE_ACTIONS.DECREASE_PRIORITY:
      notyf.alert(NOTE_ACTIONS.DECREASE_PRIORITY);
      break;

    default:
      notyf.alert('Not a BUTTON !!!');
  }
};

const handleOpenModal = () => {
  Micromodal.show('note-editor-modal');
};

renderNoteList(refs.list, initialNotes.map(note => productTemplate(note)));

//  LISTENERS

refs.editor.addEventListener('submit', handleEditorSubmit);
refs.filter.addEventListener('input', handleFilterChange);
refs.list.addEventListener('click', handleListClick);
refs.openModalBtn.addEventListener('click', handleOpenModal);
//refs.list.insertAdjacentHTML('beforeEnd');
