<script setup>
import '../assets/css/views/_desktop.scss';
import Header from '../components/layouts/Header.vue';
import AppsJson from '../data/apps.json';
import DesktopApps from '../components/layouts/DesktopApps.vue';
import Windows from '../components/layouts/Windows.vue';
import { ref } from 'vue';

const windows = ref([]);

function handleApp(app) {
  let appIsOpened = false;

  windows.value.forEach((window) => {
    if (window.name === app.name) {
      appIsOpened = true;
    }
  });

  if (!appIsOpened) {
    windows.value.push(app);
  }
}
</script>

<template>
  <main class="desktop">
    <h1 class="hidden-title">Winmac OS</h1>
    <Header />
    <DesktopApps :apps="AppsJson" @appIconClicked="handleApp($event)" />
    <Windows :windows="windows" />
  </main>
</template>
