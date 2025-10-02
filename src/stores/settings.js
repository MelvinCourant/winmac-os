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
      displayIcon: true,
    },
    date: {
      displayIcon: true,
      subitems: [
        {
          name: 'day',
          displayIcon: true,
        },
        {
          name: 'month',
          displayIcon: true,
        },
        {
          name: 'year',
          displayIcon: true,
        },
      ],
    },
    network: {
      displayIcon: true,
      refreshTime: 10,
    },
    security: {
      active: false,
      method: 'none',
      password: '',
    },
    theme: 'system',
    time: {
      displayIcon: true,
      subitems: [
        {
          name: 'hours',
          displayIcon: true,
        },
        {
          name: 'minutes',
          displayIcon: true,
        },
        {
          name: 'seconds',
          displayIcon: true,
        },
      ],
    },
    vibration: {
      active: true,
      displayIcon: true,
    },
    wallpaper: {
      display: 'cover',
      image: 'background',
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
