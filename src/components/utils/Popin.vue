<script setup>
import '../../assets/css/components/utils/_popin.scss';
import { watch, nextTick } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  display: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['hide', 'submit']);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    emit('hide');
  }
});

watch(
  () => props.display,
  async (value) => {
    if (value) {
      await nextTick();
      const firstInput = document.querySelector('.popin input:first-of-type');

      if (firstInput) {
        firstInput.focus();
      }
    }
  },
);
</script>

<template>
  <div class="popin" v-if="display">
    <h3 class="popin__title">{{ title }}</h3>
    <form class="popin__form" @submit.prevent="$emit('submit')">
      <slot></slot>
    </form>
  </div>
  <div class="popin__backdrop" @click="$emit('hide')" v-if="display"></div>
</template>
