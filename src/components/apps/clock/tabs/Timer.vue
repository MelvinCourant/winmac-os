<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="timer clock__tab" v-if="active">
    <div class="clock__tab-main">Timer</div>
  </div>
</template>
