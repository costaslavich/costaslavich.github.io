import Notyf from 'notyf';
import Micromodal from 'micromodal';
import productTemplate from '../templates/notes.hbs';
import { ICON_TYPES, NOTIFICATION_MESSAGES } from './utils/constants';
import Notepad from './utils/notepad-model';
import initialNotes from '../assets/notes.json';
import {
  refs,
  renderNoteList,
  addItemToList,
  findParentListItem,
  removeListItem,
} from './utils/view';
import '../sass/libs/micromodal.scss';
import 'notyf/dist/notyf.min.css';

const initialNotesCopyPriority = initialNotes.map(
  note => ((note.priority = Notepad.getPriorityName(note.priority)), note),
);

const createNoteMarkup = notes => {
  const markup = notes.map(note => productTemplate(note));

  return markup;
};

const markup = createNoteMarkup(initialNotesCopyPriority);

refs.list.insertAdjacentHTML('beforeend', markup);

const notepad = new Notepad(initialNotesCopyPriority);
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

  const newSaveItem = notepad.saveNote(inputValue, textareaValue);

  addItemToList(refs.list, newSaveItem);

  console.log(newSaveItem);

  notyf.confirm(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
  Micromodal.close('note-editor-modal');

  event.currentTarget.reset();
};

const handleFilterChange = ({ target }) => {
  const filteredItems = notepad.filterNotesByQuery(target.value);

  renderNoteList(refs.list, filteredItems.map(note => productTemplate(note)));
};

const handleListClick = ({ target }) => {
  if (target.parentNode.nodeName !== 'BUTTON') return;

  const actionIcon = target.textContent;

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
      console.log('Not a BUTTON !!!');
  }
};

const handleOpenModal = () => {
  Micromodal.show('note-editor-modal');
};

renderNoteList(
  refs.list,
  initialNotesCopyPriority.map(note => productTemplate(note)),
);

//  LISTENERS

refs.editor.addEventListener('submit', handleEditorSubmit);
refs.filter.addEventListener('input', handleFilterChange);
refs.list.addEventListener('click', handleListClick);
refs.openModalBtn.addEventListener('click', handleOpenModal);
