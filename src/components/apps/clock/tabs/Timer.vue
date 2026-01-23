<script setup>
import '../../../../assets/css/components/apps/clock/tabs/_timer.scss';
import { reactive, ref } from 'vue';
import ClockButton from '../ClockButton.vue';
import Popin from '../../../utils/Popin.vue';
import Input from '../../../inputs/Input.vue';

defineProps({
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

function handleActionTime(name) {
  if (
    (name === 'play' && hours.value > 0) ||
    (name === 'play' && minutes.value > 0) ||
    (name === 'play' && seconds.value > 0)
  ) {
    timeout = setInterval(updateTime, 1000);
    timerRunning.value = true;

    buttons.forEach((button) => {
      button.display = button.name !== 'play';
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

function resetTimer() {
  clearInterval(timeout);
  timeout = null;
  timerRunning.value = false;
  hours.value = hoursInput.value;
  minutes.value = minutesInput.value;
  seconds.value = secondsInput.value;

  buttons.forEach((button) => {
    button.display = button.name === 'play';
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
