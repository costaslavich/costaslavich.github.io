'use strict';

let userInput;
const numbers = [];
let total = 0;

do {
  userInput = prompt('Введите число -> ');
  numbers.push(Number(userInput));
} while (userInput == Number(userInput));
{
  numbers.pop();
  alert('Попробуйте еще раз !');
}

if (numbers.length !== 0) {
  for (let i = 0; i < numbers.length; i += 1) {
    let counter = numbers[i];
    total += counter;
  }
  console.log('Сумма введеных чисел --> ', total);
}

console.log('Вам можете начать заново !');
