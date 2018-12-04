'use strict';

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message = ' ';

let userLogin = prompt('Введите Login');
let userPassword = prompt('Введите Password');

if (!userLogin) {
  message = 'Отменено пользователем!';
} else if (userLogin !== ADMIN_LOGIN) {
  message = 'Доступ запрещен, неверный логин!';
} else {
  message = 'Login верный!';
}
console.log(message);

if (!userPassword) {
  message = 'Отменено пользователем!';
} else if (userPassword !== ADMIN_PASSWORD) {
  message = 'Доступ запрещен, неверный пароль!';
} else {
  message = 'Добро пожэаловать!';
}

alert('Сообщение от пользователя с правами админа: ', message);
console.log(message);
