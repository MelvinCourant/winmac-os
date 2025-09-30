<script setup>
import SettingsPage from '../SettingsPage.vue';
import Toggle from '../../../inputs/Toggle.vue';
import { useSettingsStore } from '../../../../stores/settings.js';
import { computed } from 'vue';
import Input from '../../../inputs/Input.vue';

defineProps({
  display: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['back']);

const settingsStore = useSettingsStore();
const { settings, updateSettings } = settingsStore;
const toggleDisplayLabel = {
  text: 'Afficher la latence réseau',
  attributes: {
    for: 'network',
    class: 'settings-page__title-big',
  },
};
const toggleDisplayAttributes = computed(() => ({
  id: 'network',
  name: 'network',
  checked: settings.network.displayIcon || !settings.network,
}));
const pingInputLabel = {
  text: 'Délai de rafraichissement (en secondes)',
  attributes: {
    for: 'ping',
    class: 'settings-page__title-small',
  },
};
const pingInputAttributes = computed(() => ({
  type: 'number',
  id: 'ping',
  name: 'ping',
  value: settings.network.refreshTime || 10,
  min: 0,
  max: 3600,
  disabled: !settings.network.displayIcon,
}));
</script>

<template>
  <SettingsPage title="Réseau" :display="display" @back="$emit('back')">
    <form class="settings-page__group">
      <Toggle
        :label="toggleDisplayLabel"
        :attributes="toggleDisplayAttributes"
        @change="
          updateSettings({
            network: {
              displayIcon: $event,
              refreshTime: settings.network.refreshTime,
            },
          })
        "
      />
      <Input
        :label="pingInputLabel"
        :attributes="pingInputAttributes"
        @change="
          updateSettings({
            network: {
              displayIcon: settings.network.displayIcon,
              refreshTime: $event.value,
            },
          })
        "
      />
    </form>
  </SettingsPage>
</template>
