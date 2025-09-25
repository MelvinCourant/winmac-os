<script setup>
import '../../assets/css/components/layouts/_desktop-apps.scss';
import AppIcon from '../utils/AppIcon.vue';

defineProps({
  apps: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="desktop-apps">
    <li v-for="app in apps" :key="app.component">
      <AppIcon :app="app" />
    </li>
  </ul>
</template>
