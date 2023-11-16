// Імпорт бібліотеки
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Елементи DOM
const calendar = document.getElementById('datetime-picker');
const startBtn = document.querySelector('BUTTON'); 
const daysRefs = document.querySelector['data-days'];
const hoursRefs = document.querySelector['data-hours'];
const minutesRefs = document.querySelector['data-minutes'];
const secondsRefs = document.querySelector['data-seconds'];

//Елементи таймеру
let selectedDate = null;
let currentDate = null;
let timerId = null;
// різниця між кінцевою і теперішньою датою в мсек
let ms = null;
// Відмальовка під час відліку
let timerRedoTime = null;
// Неактивна кнопка старт, якщо не вибрана потрібна дата
startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0].getTime);
      deltaDates(selectedDates[0]);
    },
  };


flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', onStartBtnDate);

function onStartBtnDate(evt) {
  timerId = setInterval(startTimer, 1000);
}

// function startTimer() {
//   startBtn.setAttribute('disabled', true);
//   ms -= 1000;


// }

// // функція конвертування проміжку часу від дефолтної дати до кінцевої
// function convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
//     const days = Math.floor(ms / day);
//     const hours = Math.floor((ms % day) / hour);
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);
//     return { days, hours, minutes, seconds };
//   }
  
// // padStart - 0 перед цифрою, якщо вона <10
// function addLeadingZero(value){
//     return String(value).padStart(2, '0');
// }

// function updateClockface({ days, hours, minutes, seconds }) {
//     refs.days.textContent = '${days}';
//     refs.hours.textContent = '${hours}';
//     refs.minutes.textContent = '${minutes}';
//     refs.seconds.textContent = '${seconds}';
// }
