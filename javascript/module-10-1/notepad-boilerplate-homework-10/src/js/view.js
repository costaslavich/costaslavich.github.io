export const createListItem = ({ id, title, body, priority }) => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  const notice = document.createElement('div');
  notice.classList.add('note');

  notice.append(createNoteContent(title, body), createNoteFooter(priority));
  listItem.appendChild(notice);

  return listItem;
};

export const createNoteContent = (title, body) => {
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

export const createNoteFooter = priority => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  noteFooter.append(createNotePriority(priority), createNoteAction());

  return noteFooter;
};

export const createNotePriority = priority => {
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
  notePriority.textContent = `Priority: ${Notepad.getPriorityName(priority)}`;

  noteSectionPriority.append(buttonDecrease, buttonIncrease, notePriority);

  return noteSectionPriority;
};

export const createNoteAction = () => {
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

export const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(item => createListItem(item));

  listRef.innerHTML = '';
  listRef.append(...listItems);
};

export const addItemToList = (listRef, item) => {
  const listItem = createListItem(item);

  listRef.appendChild(listItem);
};
