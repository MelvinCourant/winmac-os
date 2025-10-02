<script setup>
import SettingsPage from '../SettingsPage.vue';
import Toggle from '../../../inputs/Toggle.vue';
import { useSettingsStore } from '../../../../stores/settings.js';
import { computed } from 'vue';

defineProps({
  display: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['back']);

const settingsStore = useSettingsStore();
const { settings, updateSettings } = settingsStore;
const toggleActiveLabel = {
  text: 'Activer la vibration',
  attributes: {
    for: 'vibration-active',
    class: 'settings-page__title-big',
  },
};
const toggleActiveAttributes = computed(() => ({
  id: 'vibration',
  name: 'vibration-active',
  checked: settings.vibration.active || !settings.vibration,
}));
const toggleDisplayLabel = {
  text: 'Afficher le widget',
  attributes: {
    for: 'vibration',
    class: 'settings-page__title-small',
  },
};
const toggleDisplayAttributes = computed(() => ({
  id: 'vibration',
  name: 'vibration',
  checked: settings.vibration.displayIcon || !settings.vibration,
}));
</script>

<template>
  <SettingsPage title="Vibration" :display="display" @back="$emit('back')">
    <form class="settings-page__group">
      <Toggle
        :label="toggleActiveLabel"
        :attributes="toggleActiveAttributes"
        @change="
          updateSettings({
            vibration: {
              active: $event,
              displayIcon: settings.vibration.displayIcon,
            },
          })
        "
      />
      <Toggle
        :label="toggleDisplayLabel"
        :attributes="toggleDisplayAttributes"
        @change="
          updateSettings({
            vibration: {
              active: settings.vibration.active,
              displayIcon: $event,
            },
          })
        "
      />
    </form>
  </SettingsPage>
</template>
