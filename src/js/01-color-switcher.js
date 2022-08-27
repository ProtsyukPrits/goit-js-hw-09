const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },
};
// refs.btnStop.disabled = true
// if (timerStart = null) {
//    document.body.style.background = 'white'
// }

refs.btnStart.addEventListener('click', handleStart);
refs.btnStop.addEventListener('click', handleStop);



function handleStart(e) {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;

  timerStart = setInterval(() => {
    document.body.style.background = refs.getRandomHexColor();
  }, 500);
}

function handleStop(e) {
  clearInterval(timerStart)
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
}
