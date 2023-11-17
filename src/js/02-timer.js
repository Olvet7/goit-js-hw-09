import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

// Посилання на всі елементи
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
}

// Параметри при виборі минулої дати
blockStartBtn()
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    console.log(selectedDates[0]);
    if (selectedDate < currentDate) {
      blockStartBtn();
      Report.warning(
        'Please, choose a date in the future!'
        );
    } else {
      unblockStartBtn()
    }
  },
};

// Підключення бібліотеки календаря
const calendar = flatpickr('#datetime-picker', options);

// Слухач на кнопку "старт"
refs.startBtn.addEventListener('click', onStartBtn);

// Функція після вибору майбутньої дати
function onStartBtn() {
  blockStartBtn();
  Report.success('Timer started');
  const timerId = setInterval(() => {
    const futureDate = calendar.selectedDates[0];
    const currentDate = new Date();
    const deltaTime = futureDate - currentDate;
    const converterDeltatime = convertMs(deltaTime);
    refs.days.textContent = padStart(converterDeltatime.days);
    refs.hours.textContent = padStart(converterDeltatime.hours);
    refs.minutes.textContent = padStart(converterDeltatime.minutes);
    refs.seconds.textContent = padStart(converterDeltatime.seconds);
    if (deltaTime < 1000) {
      clearInterval(timerId);
      Report.success("Time's up");
    }
  }, 1000);
}


// Функція блокування кнопки старт
function blockStartBtn(){
  refs.startBtn.disabled = true;
}

// Функція розблокування кнопки старт
function unblockStartBtn(){
  refs.startBtn.disabled = false;
}

// Функція перерахунку мілісекунд в дні, години, хвилини, секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// Функція додавання 0 перед цифорою, яка менша за 10
function padStart(value){
  return String(value).padStart(2, '0');
}

