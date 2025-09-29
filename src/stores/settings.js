import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  let localStorageSettings = null;

  if (localStorage.getItem('wm-os-settings')) {
    localStorageSettings = JSON.parse(
      localStorage.getItem('wm-os-settings') || '{}',
    );
  }

  const settings = ref({
    battery: {
      active: true,
    },
    theme: 'system',
    wallpaper: {
      image: 'background',
      display: 'cover',
    },
  });

  if (localStorageSettings) {
    settings.value = localStorageSettings;
  }

  function updateSettings(newSettings) {
    for (let key in newSettings) {
      settings.value[key] = newSettings[key];
    }

    localStorage.setItem('wm-os-settings', JSON.stringify(settings.value));
  }

  return {
    settings,
    updateSettings,
  };
});
