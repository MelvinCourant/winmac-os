<script setup>
import './assets/css/main.scss';
import Desktop from './views/Desktop.vue';
import { useSettingsStore } from './stores/settings.js';
import { computed, ref, watch } from 'vue';
import LockScreen from './views/LockScreen.vue';
import PinCode from './components/inputs/PinCode.vue';
import Input from './components/inputs/Input.vue';

const settingsStore = useSettingsStore();
const { settings } = settingsStore;
const locking = ref(
  settings.security.active && settings.security.method !== 'none',
);
const lockingMethod = ref(settings.security.method);
const passwordAttributes = computed(() => ({
  type: 'password',
  placeholder: 'Mot de passe',
  value: '',
  max: 20,
}));
const submitButtonAttributes = computed(() => ({
  type: 'submit',
  value: 'Enter',
  class: 'input--hidden',
}));
const password = ref('');
const vibrate = ref(false);

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

function verifyPassword() {
  if (password.value === settings.security.password) {
    locking.value = false;
  } else {
    if (settings.security.method === 'password') {
      passwordAttributes.value.value = password.value;
    }

    vibrate.value = true;

    setTimeout(() => {
      vibrate.value = false;
    }, 200);
  }
}
</script>

<template>
  <Desktop v-if="!locking" />
  <LockScreen v-else @submit="verifyPassword">
    <PinCode
      v-if="lockingMethod === 'pin'"
      size="big"
      @input="password = $event"
      :vibrate="vibrate"
    />
    <Input
      v-else
      :attributes="passwordAttributes"
      @change="password = $event.value"
      :vibrate="vibrate"
    />
    <Input
      v-if="lockingMethod === 'pin'"
      :attributes="submitButtonAttributes"
    />
  </LockScreen>
</template>
