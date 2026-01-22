<script setup>
import '../../../../assets/css/components/apps/clock/tabs/_timedate.scss';
import { ref } from 'vue';

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const currentDate = ref(capitalize(new Date().toLocaleDateString('fr-FR', options)));
const currentHours = ref(new Date().getHours());
const currentMinutes = ref(new Date().getMinutes());
const currentSeconds = ref(new Date().getSeconds());

setInterval(updateDateTime, 1000);

function updateDateTime() {
  if (currentSeconds.value === 59) {
    currentSeconds.value = 0;

    if (currentMinutes.value === 59) {
      currentMinutes.value = 0;

      if (currentHours.value === 23) {
        currentHours.value = 0;
        currentDate.value = capitalize(new Date().toLocaleDateString('fr-FR', options));
      } else {
        currentHours.value += 1;
      }
    } else {
      currentMinutes.value += 1;
    }
  } else {
    currentSeconds.value += 1;
  }
}
</script>

<template>
  <div class="timedate clock__tab" v-if="active">
    <div class="clock__tab-main">
      <p class="clock__time">
        <template v-if="currentHours < 10">0</template
        >{{ currentHours }}:<template v-if="currentMinutes < 10">0</template
        >{{ currentMinutes }}:<template v-if="currentSeconds < 10">0</template
        >{{ currentSeconds }}
      </p>
      <div class="clock__separator"></div>
      <p class="timedate__date">{{ currentDate }}</p>
    </div>
  </div>
</template>
