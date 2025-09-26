<script setup>
import SettingsPage from '../SettingsPage.vue';
import { reactive } from 'vue';
import Select from '../../../inputs/Select.vue';
import { useSettingsStore } from '../../../../stores/settings.js';
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

function updateTheme(theme) {
  updateSettings({
    theme: theme,
  });
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
  </SettingsPage>
</template>
