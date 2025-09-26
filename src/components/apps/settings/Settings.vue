<script setup>
import '../../../assets/css/components/apps/settings/_settings.scss';
import SettingsJson from '../../../data/settings.json';
import { defineAsyncComponent, reactive, ref } from 'vue';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const settingsComponents = reactive({});
const pageDisplayed = ref(null);

// Generate dynamically settings pages
SettingsJson.forEach((setting) => {
  if (setting.component) {
    try {
      settingsComponents[setting.name] = defineAsyncComponent({
        loader: async () => {
          try {
            return await import(`./pages/${setting.component}.vue`);
          } catch (error) {
            console.warn(
              `Settings component ${setting.component} not found, skipping...`,
            );
            return { template: '<div></div>' };
          }
        },
        onError: (error) => {
          console.warn(
            `Error loading settings component ${setting.component}:`,
            error,
          );
          delete settingsComponents[setting.name];
        },
      });
    } catch (error) {
      console.warn(
        `Failed to define settings component ${setting.component}:`,
        error,
      );
    }
  }
});
</script>

<template>
  <div :class="['settings', { 'settings--page-displayed': pageDisplayed }]">
    <h2 class="settings__title">{{ app.title }}</h2>
    <div class="settings__list">
      <button
        class="settings-item"
        v-for="setting in SettingsJson"
        :key="setting.name"
        @click="pageDisplayed = setting.name"
      >
        <div class="settings-item__icon" v-html="setting.icon"></div>
        <div class="settings-item__text">
          <h3 class="settings-item__title">{{ setting.title }}</h3>
          <p class="settings-item__description">{{ setting.description }}</p>
        </div>
      </button>
    </div>
  </div>
  <template v-for="setting in SettingsJson" :key="`component-${setting.name}`">
    <component
      v-if="settingsComponents[setting.name]"
      :is="settingsComponents[setting.name]"
      :display="pageDisplayed === setting.name"
      @back="pageDisplayed = null"
    />
  </template>
</template>
