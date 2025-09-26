<script setup>
import './assets/css/main.scss';
import Desktop from './views/Desktop.vue';
import { useSettingsStore } from './stores/settings.js';
import { watch } from 'vue';

const settingsStore = useSettingsStore();
const { settings } = settingsStore;

if (settings.theme === 'dark' || settings.theme === 'light') {
  document.querySelector('#app').classList.add(settings.theme);
}

watch(settings, (value) => {
  if (value.theme === 'system') {
    document.querySelector('#app').classList = '';
  } else if (value.theme === 'dark' || value.theme === 'light') {
    document.querySelector('#app').classList = value.theme;
  }
});
</script>

<template>
  <Desktop />
</template>
