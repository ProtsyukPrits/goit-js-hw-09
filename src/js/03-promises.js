import Notiflix from 'notiflix';

const refs = {
  delayEl: document.querySelector('input[name="delay"]'),
  delayStepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  btnSub: document.querySelector('button[type="submit"]'),
};

refs.btnSub.addEventListener('click', handleBtn);

function handleBtn(e) {
  e.preventDefault();

  let delay = Number(refs.delayEl.value);
  let step = Number(refs.delayStepEl.value);

  for (let i = 0; i < refs.amountEl.value; i += 1) {
    createPromise(1 + i, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
 const  promise = new Promise((resolve, reject) => {
    setTimeout(() => {
       const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position,delay })
      }
    }, delay)
  })
  return promise;
}
