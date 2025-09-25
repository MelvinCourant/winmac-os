<script setup>
import '../../assets/css/components/apps/_settings.scss';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="settings">
    <h2 class="settings__title">{{ app.name }}</h2>
  </div>
</template>
