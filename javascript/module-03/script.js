'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const MESSAGE_INVALID = 'Ошибка! Логин должен быть от 4 до 16 символов';
const MESSAGE_LOGIN_ADDED = 'Логин успешно добавлен!';
const MESSAGE_LOGIN_FALSE = 'Такой логин уже используется!';

const login = prompt('Введите логин!');

const isLoginValid = function(login) {
  if (!login) return;
  else if (login.length < 4 || login.length > 16) {
    console.log(MESSAGE_INVALID);
  }
};

const isLoginUnique = function(allLogins, login) {
  for (const value of allLogins) {
    if (value === login) console.log(MESSAGE_LOGIN_FALSE);
  }
};

const addLogin = function(allLogins, login) {
  isLoginValid(login);
  isLoginUnique(logins, login);
  if (isLoginValid() && isLoginUnique()) {
    console.log(MESSAGE_LOGIN_ADDED);
    logins.push(login);
  }
};

addLogin(logins, login);
console.log(logins);
