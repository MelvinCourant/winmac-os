<script setup>
import '../assets/css/views/_lock-screen.scss';
import { onMounted } from 'vue';

defineEmits(['submit']);

onMounted(() => {
  document.querySelector('.lock-screen input').focus();
});
</script>

<template>
  <div class="lock-screen">
    <form @submit.prevent="$emit('submit')">
      <slot></slot>
    </form>
  </div>
</template>
