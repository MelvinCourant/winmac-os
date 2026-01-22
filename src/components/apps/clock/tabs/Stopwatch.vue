<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="stopwatch clock__tab" v-if="active">
    <div class="clock__tab-main">Stopwatch</div>
  </div>
</template>
