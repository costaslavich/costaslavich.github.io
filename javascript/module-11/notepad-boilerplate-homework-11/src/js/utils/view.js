import productTemplate from '../../templates/notes.hbs';

export const refs = {
  list: document.querySelector('.note-list'),
  editor: document.querySelector('form.note-editor'),
  editorInput: document.querySelector('.note-editor input'),
  filter: document.querySelector('form.search-form'),
  openModalBtn: document.querySelector('button[data-action="open-editor"]'),
};

export const renderNoteList = (listRef, notes) => {
  listRef.innerHTML = '';
  notes.map(note => listRef.insertAdjacentHTML('beforeend', note));
};

export const addItemToList = (listRef, item) => {
  const listItem = productTemplate(item);

  listRef.insertAdjacentHTML('beforeend', listItem);
};

export const findParentListItem = element => {
  const parentListItem = element.closest('.note-list__item');

  return parentListItem;
};

export const removeListItem = listItem => {
  listItem.remove();
};
