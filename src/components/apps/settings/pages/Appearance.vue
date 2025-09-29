<script setup>
import SettingsPage from '../SettingsPage.vue';
import { computed, reactive } from 'vue';
import Select from '../../../inputs/Select.vue';
import { useSettingsStore } from '../../../../stores/settings.js';
import Input from '../../../inputs/Input.vue';
const settingsStore = useSettingsStore();
const { settings, updateSettings } = settingsStore;

defineProps({
  display: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['back']);

const themeSelectLabel = {
  text: "Thème de l'OS",
  attributes: {
    for: 'theme',
    class: 'settings-page__title-big',
  },
};
const themeSelectAttributes = {
  id: 'theme',
  name: 'theme',
};
const themeSelectOptions = reactive([
  {
    label: 'Thème du système',
    value: 'system',
    selected: settings.theme === 'system',
  },
  {
    label: 'Sombre',
    value: 'dark',
    selected: settings.theme === 'dark',
  },
  {
    label: 'Clair',
    value: 'light',
    selected: settings.theme === 'light',
  },
  {
    label: 'Personnalisable',
    value: 'custom',
    selected: settings.theme === 'custom',
  },
]);
const background = computed(() => ({
  src:
    (settings.background && settings.background === 'background') || !settings
      ? new URL('../../../../assets/imgs/background.jpg', import.meta.url).href
      : settings.background,
  alt: 'OS Background',
}));
const backgroundLabel = {
  text: "Fond d'écran",
  attributes: {
    for: 'background',
    class: 'settings-page__title-big',
  },
};
const backgroundAttributes = {
  id: 'background',
  name: 'background',
  type: 'file',
  accept: 'image/png, image/jpeg, image/jpg, image/webp, image/gif',
  text: 'Importer une image',
};
const resetAttributes = {
  type: 'button',
  value: "Réinitialiser le fond d'écran",
};

function updateTheme(theme) {
  updateSettings({
    theme: theme,
  });
}

function updateBackground(image) {
  if (!image.files || image.files.length === 0) {
    return;
  }
  const file = image.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    updateSettings({
      background: reader.result,
    });
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <SettingsPage title="Apparence" :display="display" @back="$emit('back')">
    <form class="settings-page__group">
      <Select
        :label="themeSelectLabel"
        :attributes="themeSelectAttributes"
        :options="themeSelectOptions"
        @change="updateTheme"
      />
    </form>
    <form class="settings-page__group">
      <Input
        :label="backgroundLabel"
        :attributes="backgroundAttributes"
        @change="updateBackground"
      />
      <div class="settings-page__row">
        <div class="settings-page__image background" v-if="background.src">
          <img :src="background.src" :alt="background.alt" />
        </div>
        <Input
          :attributes="resetAttributes"
          @click="updateSettings({ background: 'background' })"
        />
      </div>
    </form>
  </SettingsPage>
</template>
