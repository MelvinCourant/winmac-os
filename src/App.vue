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

if (settings.wallpaper.image !== 'background') {
  document.body.style.backgroundImage = `url(${settings.background.image})`;
} else if (settings.wallpaper.image === 'background') {
  document.body.style.backgroundImage = '';
}

if (settings.wallpaper.display === 'repeat') {
  document.body.style.backgroundRepeat = settings.wallpaper.display;
  document.body.style.backgroundSize = '20%';
} else if (settings.wallpaper.display === 'center') {
  document.body.style.backgroundSize = 'initial';
  document.body.style.backgroundRepeat = '';
} else {
  document.body.style.backgroundSize = settings.wallpaper.display;
  document.body.style.backgroundRepeat = '';
}

watch(settings, (value) => {
  if (value.theme === 'system') {
    document.querySelector('#app').classList = '';
  } else if (value.theme === 'dark' || value.theme === 'light') {
    document.querySelector('#app').classList = value.theme;
  }

  if (value.wallpaper.image !== 'background') {
    document.body.style.backgroundImage = `url(${value.background.image})`;
  } else if (value.wallpaper.image === 'background') {
    document.body.style.backgroundImage = '';
  }

  if (value.wallpaper.display === 'repeat') {
    document.body.style.backgroundRepeat = value.wallpaper.display;
    document.body.style.backgroundSize = '20%';
  } else if (value.wallpaper.display === 'center') {
    document.body.style.backgroundSize = 'initial';
    document.body.style.backgroundRepeat = '';
  } else {
    document.body.style.backgroundSize = value.wallpaper.display;
    document.body.style.backgroundRepeat = '';
  }
});
</script>

<template>
  <Desktop />
</template>
