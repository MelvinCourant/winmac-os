<script setup>
import '../../../../assets/css/components/apps/clock/tabs/_timer.scss';
import { reactive, ref, watch } from 'vue';
import ClockButton from '../ClockButton.vue';
import Popin from '../../../utils/Popin.vue';
import Input from '../../../inputs/Input.vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const hoursInput = ref(0);
const minutesInput = ref(0);
const secondsInput = ref(0);
const buttons = reactive([
  {
    name: 'stop',
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">\n' +
      '  <path d="M0 18V0H18V18H0Z" fill="var(--color)"/>\n' +
      '</svg>',
    display: false,
  },
  {
    name: 'play',
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="19" viewBox="0 0 14 19" fill="none">\n' +
      '  <path d="M0.0258789 18.5V0.5L13.935 9.5L0.0258789 18.5Z" fill="var(--color)"/>\n' +
      '</svg>',
    display: true,
  },
  {
    name: 'break',
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">\n' +
      '  <path d="M12 18V0H18V18H12ZM0 18V0H6V18H0Z" fill="var(--color)"/>\n' +
      '</svg>',
    display: false,
  },
  {
    name: 'reset',
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">\n' +
      '  <path d="M7.875 20.7563C5.60625 20.475 3.72656 19.4859 2.23594 17.7891C0.745312 16.0922 0 14.1 0 11.8125C0 10.575 0.24375 9.38906 0.73125 8.25469C1.21875 7.12031 1.9125 6.13125 2.8125 5.2875L4.41562 6.89063C3.70312 7.52813 3.16406 8.26875 2.79844 9.1125C2.43281 9.95625 2.25 10.8563 2.25 11.8125C2.25 13.4625 2.775 14.9203 3.825 16.1859C4.875 17.4516 6.225 18.225 7.875 18.5063V20.7563ZM10.125 20.7563V18.5063C11.7562 18.2063 13.1016 17.4281 14.1609 16.1719C15.2203 14.9156 15.75 13.4625 15.75 11.8125C15.75 9.9375 15.0937 8.34375 13.7812 7.03125C12.4687 5.71875 10.875 5.0625 9 5.0625H8.91562L10.1531 6.3L8.57812 7.875L4.64062 3.9375L8.57812 0L10.1531 1.575L8.91562 2.8125H9C11.5125 2.8125 13.6406 3.68438 15.3844 5.42813C17.1281 7.17188 18 9.3 18 11.8125C18 14.0813 17.2547 16.0641 15.7641 17.7609C14.2734 19.4578 12.3937 20.4563 10.125 20.7563Z" fill="#E3E3E3"/>\n' +
      '</svg>',
    display: true,
  },
]);
const popin = reactive({
  title: '',
  display: false,
  method: 'none',
});
const inputNumberAttributes = reactive({
  type: 'number',
  name: '',
  min: 0,
  max: 99999,
  value: null,
});
const submitButtonAttributes = reactive({
  type: 'submit',
  value: 'Valider',
});
const timerRunning = ref(false);
let timeout;

function triggerKeyboard(e) {
  if (e.key === ' ' && !timeout) {
    handleActionTime('play');
  } else if (e.key === ' ' && timeout) {
    handleActionTime('break');
  } else if (e.key === 'Backspace' && timeout) {
    handleActionTime('stop');
  } else if (e.key === 'Escape') {
    handleActionTime('reset');
  }
}

function handleActionTime(name) {
  if (
    (name === 'play' && hours.value > 0) ||
    (name === 'play' && minutes.value > 0) ||
    (name === 'play' && seconds.value > 0)
  ) {
    timeout = setInterval(updateTime, 1000);
    timerRunning.value = true;

    buttons.forEach((button) => {
      button.display = button.name !== 'play' || button.name === 'reset';
    });
  } else if (name === 'stop') {
    resetTimer();
  } else if (name === 'break') {
    clearInterval(timeout);
    timeout = null;
    timerRunning.value = false;

    buttons.forEach((button) => {
      if (button.name === 'break') {
        button.display = false;
      } else if (button.name === 'play') {
        button.display = true;
      }
    });
  } else if (name === 'reset') {
    resetTimer(true);
  }
}

function updateTime() {
  if (hours.value <= 0 && minutes.value <= 0 && seconds.value <= 0) {
    resetTimer();
    notify();

    return;
  }

  if (seconds.value === 0) {
    seconds.value = 59;

    if (minutes.value === 0) {
      minutes.value = 59;
      hours.value -= 1;
    } else {
      minutes.value -= 1;
    }
  } else {
    seconds.value -= 1;
  }
}

function resetTimer(hard = false) {
  clearInterval(timeout);
  timeout = null;
  timerRunning.value = false;

  if (hard) {
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
  } else {
    hours.value = hoursInput.value;
    minutes.value = minutesInput.value;
    seconds.value = secondsInput.value;
  }

  buttons.forEach((button) => {
    button.display = button.name === 'play' || button.name === 'reset';
  });
}

function formatTime(time) {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
}

function displayPopin(title, name, value = null, max = 99999) {
  inputNumberAttributes.name = name;
  inputNumberAttributes.max = max;

  if (value > 0) {
    inputNumberAttributes.value = value;
  } else {
    inputNumberAttributes.value = null;
  }

  popin.title = title;
  popin.display = true;
}

function updateTimer() {
  if (!inputNumberAttributes.value) {
    inputNumberAttributes.value = 0;
  }

  if (inputNumberAttributes.name === 'hours') {
    hours.value = inputNumberAttributes.value;
    hoursInput.value = inputNumberAttributes.value;
  } else if (inputNumberAttributes.name === 'minutes') {
    minutes.value = inputNumberAttributes.value;
    minutesInput.value = inputNumberAttributes.value;
  } else if (inputNumberAttributes.name === 'seconds') {
    seconds.value = inputNumberAttributes.value;
    secondsInput.value = inputNumberAttributes.value;
  }

  popin.display = false;
}

function notify() {
  if (Notification.permission === 'granted') {
    new Notification('Le temps est écoulé');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Le temps est écoulé');
      }
    });
  }
}

watch(
  () => props.active,
  (value) => {
    if (value) {
      window.addEventListener('keydown', triggerKeyboard);
    } else {
      window.removeEventListener('keydown', triggerKeyboard);
    }
  },
);
</script>

<template>
  <div class="timer clock__tab" v-if="active">
    <div class="clock__tab-main">
      <div class="clock__time">
        <input
          class="timer__input"
          type="button"
          :disabled="timerRunning"
          :value="formatTime(hours)"
          @click="displayPopin('Heures', 'hours', hoursInput)"
        />:<input
          class="timer__input"
          type="button"
          :disabled="timerRunning"
          :value="formatTime(minutes)"
          @click="displayPopin('Minutes', 'minutes', minutesInput, 59)"
        />:<input
          class="timer__input"
          type="button"
          :disabled="timerRunning"
          :value="formatTime(seconds)"
          @click="displayPopin('Secondes', 'seconds', secondsInput, 59)"
        />
      </div>
      <div class="clock__separator"></div>
      <div class="stopwatch__buttons">
        <ClockButton
          v-for="button in buttons"
          :key="button.name"
          :button="button"
          @clicked="handleActionTime($event)"
        />
      </div>
    </div>
    <Popin
      :title="popin.title"
      :display="popin.display"
      @hide="popin.display = false"
      @submit="updateTimer"
      ><Input
        :attributes="inputNumberAttributes"
        @change="inputNumberAttributes.value = $event.value" />
      <Input :attributes="submitButtonAttributes"
    /></Popin>
  </div>
</template>
