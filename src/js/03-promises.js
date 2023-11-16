//Бібліотека Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Форма
const submitForm = document.querySelector('form.form') 

// Слухач на кнопку
submitForm.addEventListener('submit', onSubmitPromise);

// Генерація промісів
function onSubmitPromise(evt) {
  evt.preventDefault();
  let delay = Number(submitForm.delay.value);
  for(let i=1; i < submitForm.amount.value; i+=1) {
  
    createPromise(i, delay) 
      .then(({position, delay}) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delay += Number(submitForm.step.value);
  }
}

function createPromise(position, delay) {
  const object = {position, delay};
  const shouldResolve = Math.random() > 0.3;

  return new Promise ((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res(object);
      } else {
        // Reject
        rej(object);
      }
    }, delay)
  });
}


