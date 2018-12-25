'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const MESSAGE_INVALID = 'Ошибка! Логин должен быть от 4 до 16 символов';
const MESSAGE_LOGIN_ADDED = 'Логин успешно добавлен!';
const MESSAGE_LOGIN_FALSE = 'Такой логин уже используется!';
const MESSAGE_CANCELED = 'Нажата отмена!';

const login = prompt('Введите логин!');

const isLoginValid = function(login) {
  if (login.length < 4 || login.length > 16) {
    console.log(MESSAGE_INVALID);
    return false;
  } else return true;
};

const isLoginUnique = function(allLogins, login) {
  if (logins.includes(login)) {
    console.log(MESSAGE_LOGIN_FALSE);
    return false;
  } else return true;
};

const addLogin = function(allLogins, login) {
  if (!login) {
    return console.log(MESSAGE_CANCELED);
  }
  if (isLoginValid(login) && isLoginUnique(logins, login)) {
    console.log(MESSAGE_LOGIN_ADDED);
    return logins.push(login);
  }
};

addLogin(logins, login);

console.log(logins);
