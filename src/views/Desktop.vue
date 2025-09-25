<script setup>
import '../assets/css/views/_desktop.scss';
import Header from '../components/layouts/Header.vue';
import AppsJson from '../data/apps.json';
import DesktopApps from '../components/layouts/DesktopApps.vue';
</script>

<template>
  <main class="desktop">
    <h1 class="hidden-title">Winmac OS</h1>
    <Header />
    <DesktopApps :apps="AppsJson" />
  </main>
</template>
