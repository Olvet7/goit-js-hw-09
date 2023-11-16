//Елементи кнопок
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
// ID таймеру
let intervalId = null;

// Слухачі на кнопки старт і стоп
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

// Функція старту
function onStart() {
    intervalId = setInterval(onChangeBG, 1000);
    startBtn.toggleAttribute('disabled');
}

// Функція зупинки зміни кольору фону
function onStop() {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
}

// Зміна кольору фону
function onChangeBG(evt){
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);
}

// Генерація рандомного кольору
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }