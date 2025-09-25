<script setup>
import '../../../assets/css/components/apps/settings/_settings.scss';
import SettingsJson from '../../../data/settings.json';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="settings">
    <h2 class="settings__title">{{ app.title }}</h2>
    <div class="settings__list">
      <button
        class="settings-item"
        v-for="setting in SettingsJson"
        :key="setting.name"
      >
        <div class="settings-item__icon" v-html="setting.icon"></div>
        <div class="settings-item__text">
          <h3 class="settings-item__title">{{ setting.title }}</h3>
          <p class="settings-item__description">{{ setting.description }}</p>
        </div>
      </button>
    </div>
  </div>
</template>
