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

if (settings.background !== 'background') {
  document.body.style.backgroundImage = `url(${settings.background})`;
}

watch(settings, (value) => {
  if (value.theme === 'system') {
    document.querySelector('#app').classList = '';
  } else if (value.theme === 'dark' || value.theme === 'light') {
    document.querySelector('#app').classList = value.theme;
  }

  if (value.background !== 'background') {
    document.body.style.backgroundImage = `url(${value.background})`;
  } else if (value.background === 'background') {
    document.body.style = '';
  }
});
</script>

<template>
  <Desktop />
</template>
