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
    date: {
      active: true,
      subitems: [
        {
          name: 'day',
          active: true,
        },
        {
          name: 'month',
          active: true,
        },
        {
          name: 'year',
          active: true,
        },
      ],
    },
    theme: 'system',
    time: {
      active: true,
      subitems: [
        {
          name: 'hours',
          active: true,
        },
        {
          name: 'minutes',
          active: true,
        },
        {
          name: 'seconds',
          active: true,
        },
      ],
    },
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
