// Завдання 1:  - Які є способи копіювання простого об’єкта типу obj = {a: 1, b: 2, c: 3} //
const obj = { a: 1, b: 2, c: 3 };

const copyObj = { ...obj }; //використання spreаd - найбільш сучасний і поширений підхід

const copyObj2 = Object.assign({}, obj); //використання методу assign

// Завдання 2: deep clone для об’єкта //
// Рекурсивно створюємо новий об’єкт clone

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  let clone = Array.isArray(obj) ? [] : {};

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i]);
    }
  } else {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key]);
      }
    }
  }

  return clone;
}

// Завдання 3: Назвіть різні способи, як поміняти місцями значення двох змінних.

let first = 5;
let second = 10;

// №1 - створюємо третю буферну змінну:
const buffer = first;
first = second;
second = buffer;

// №2 - використовуємо деструктуризацію масиву або об’єкта:
const array = [first, second];
[second, first] = array;

//або
const object = { first: second, second: first };
({ first, second } = object);
