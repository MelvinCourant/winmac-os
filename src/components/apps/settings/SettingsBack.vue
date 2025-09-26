<script setup>
import '../../../assets/css/components/apps/settings/_settings-back.scss';

defineEmits(['back']);
</script>

<template>
  <button class="settings-back" @click="$emit('back')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="32"
      viewBox="0 0 30 32"
      fill="none"
    >
      <path
        d="M15 31.2L0 15.8727L15 0.54541L16.5052 2.0304L3.99654 14.812H30V16.9334H3.99654L16.5052 29.715L15 31.2Z"
        fill="var(--color)"
      />
    </svg>
  </button>
</template>
