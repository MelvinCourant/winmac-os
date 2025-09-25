<script setup>
import Window from '../utils/Window.vue';

defineProps({
  windows: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="windows">
    <Window v-for="window in windows" :app="window" />
  </div>
</template>
