<script setup>
import '../../../assets/css/components/apps/settings/_settings.scss';
import SettingsJson from '../../../data/settings.json';
import { defineAsyncComponent, inject, reactive, ref, watch } from 'vue';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const settingsComponents = reactive({});
const actualPageDisplayed = ref(null);
const oldPageDisplayed = ref(null);

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

watch(inject('displaySettingsPage'), (value) => {
  if (value) {
    oldPageDisplayed.value = actualPageDisplayed.value;
    actualPageDisplayed.value = value;

    setTimeout(() => {
      oldPageDisplayed.value = null;
    }, 500);
  }
});
</script>

<template>
  <div
    :class="['settings', { 'settings--page-displayed': actualPageDisplayed }]"
  >
    <h2 class="settings__title">{{ app.title }}</h2>
    <div class="settings__list">
      <button
        class="settings-item"
        v-for="setting in SettingsJson"
        :key="setting.name"
        @click="
          oldPageDisplayed = actualPageDisplayed;
          actualPageDisplayed = setting.name;
        "
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
      :display="
        oldPageDisplayed === setting.name ||
        actualPageDisplayed === setting.name
      "
      :data-settings-page="setting.name"
      :class="{
        'settings-page__highlighted': actualPageDisplayed === setting.name,
      }"
      @back="
        oldPageDisplayed = null;
        actualPageDisplayed = null;
      "
    />
  </template>
</template>
