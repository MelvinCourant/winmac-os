<script setup>
import '../../../../assets/css/components/apps/clock/tabs/_stopwatch.scss';
import { reactive, ref, nextTick } from 'vue';
import ClockButton from '../ClockButton.vue';

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const deciseconds = ref(0);
const steps = ref([]);
const stepsList = ref(null);
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
    name: 'step',
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">\n' +
      '  <path d="M0 18V0H9L9.64286 2.57143H15.4286V12.8571H9L8.35714 10.2857H1.92857V18H0Z" fill="var(--color)"/>\n' +
      '</svg>',
    display: false,
  },
]);
let timeout;

function scrollToBottom() {
  nextTick(() => {
    if (stepsList.value) {
      stepsList.value.scrollTop = stepsList.value.scrollHeight;
    }
  });
}

function handleActionTime(name) {
  if (name === 'play') {
    timeout = setInterval(updateTime, 10);

    buttons.forEach((button) => {
      button.display = button.name !== 'play';
    });
  } else if (name === 'stop') {
    clearInterval(timeout);
    timeout = null;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    deciseconds.value = 0;
    steps.value = [];

    buttons.forEach((button) => {
      button.display = button.name === 'play';
    });
  } else if (name === 'break') {
    clearInterval(timeout);
    timeout = null;

    buttons.forEach((button) => {
      if (button.name === 'break') {
        button.display = false;
      } else if (button.name === 'play') {
        button.display = true;
      }
    });
  } else if (name === 'step') {
    let time = '';

    if (hours.value > 0) {
      time += formatTime('hours', hours.value);
    }

    if (minutes.value > 0) {
      time += formatTime('minutes', minutes.value);
    } else {
      time += '00:';
    }

    if (seconds.value > 0) {
      time += formatTime('seconds', seconds.value);
    } else {
      time += '00:';
    }

    if (deciseconds.value > 0) {
      time += formatTime('deciseconds', deciseconds.value);
    } else {
      time += '00';
    }

    steps.value.push(time);
    scrollToBottom();
  }
}

function formatTime(type, value) {
  if (type !== 'deciseconds') {
    if (value > 0 && value < 10) {
      return `0${value}:`;
    } else if (value > 10) {
      return `${value}:`;
    }
  } else {
    if (value > 0 && value < 10) {
      return `0${value}`;
    } else if (value > 10) {
      return `${value}`;
    }
  }
}

function updateTime() {
  if (deciseconds.value === 99) {
    deciseconds.value = 0;

    if (seconds.value === 59) {
      seconds.value = 0;

      if (minutes.value === 59) {
        minutes.value = 0;
        hours.value += 1;
      } else {
        minutes.value += 1;
      }
    } else {
      seconds.value += 1;
    }
  } else {
    deciseconds.value += 1;
  }
}
</script>

<template>
  <div class="stopwatch clock__tab" v-if="active">
    <div class="stopwatch__steps" v-if="steps.length">
      <p class="stopwatch__steps-title">Etapes</p>
      <ul class="stopwatch__steps-list" ref="stepsList">
        <li class="stopwatch__step" v-for="(step, index) in steps">
          <span>{{ index + 1 }}</span> {{ step }}
        </li>
      </ul>
    </div>
    <div class="clock__tab-main">
      <p class="clock__time">
        <template v-if="hours > 0"
          ><template v-if="hours > 0 && hours < 10">0</template
          >{{ hours }}:</template
        ><template v-if="minutes < 10">0</template>{{ minutes }}:<template
          v-if="seconds < 10"
          >0</template
        >{{ seconds
        }}<template v-if="hours === 0"
          >:<template v-if="deciseconds < 10">0</template
          >{{ deciseconds }}</template
        >
      </p>
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
  </div>
</template>
