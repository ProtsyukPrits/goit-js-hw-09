import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateValue: document.querySelector('input#datetime-picker'),
  dataTimer: document.querySelector('.timer'),
  btnStart: document.querySelector('button[data-start]'),
  dataDays: document.querySelector('span[data-days]'),
  dataHours: document.querySelector('span[data-hours]'),
  dataMinutes: document.querySelector('span[data-minutes]'),
  dataSeconds: document.querySelector('span[data-seconds]'),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickr(refs.dateValue, options);

refs.btnStart.addEventListener('click', handleStart);

function handleStart() {
  const timer = setInterval(() => {
    const countDown = new Date(refs.dateValue.value) - new Date();
    refs.btnStart.disabled = true;

    if (countDown >= 0) {
      const convertData = convertMs(countDown);
      refs.dataDays.textContent = addLeadingZero(convertData.days);
      refs.dataHours.textContent = addLeadingZero(convertData.hours);
      refs.dataMinutes.textContent = addLeadingZero(convertData.minutes);
      refs.dataSeconds.textContent = addLeadingZero(convertData.seconds);

      if (countDown <= 10000) {
        refs.dataTimer.style.color = 'tomato';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      refs.dataTimer.style.color = 'black';
      clearInterval(timer);
    }
  }, 0);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
