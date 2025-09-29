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
const toggleDisplayLabel = {
  text: 'Afficher le widget',
  attributes: {
    for: 'battery',
    class: 'settings-page__title-big',
  },
};
const toggleDisplayAttributes = computed(() => ({
  id: 'battery',
  name: 'battery',
  checked: settings.battery.active || !settings.battery,
}));
</script>

<template>
  <SettingsPage title="Batterie" :display="display" @back="$emit('back')">
    <form class="settings-page__group">
      <Toggle
        :label="toggleDisplayLabel"
        :attributes="toggleDisplayAttributes"
        @change="
          updateSettings({
            battery: {
              active: $event,
            },
          })
        "
      />
    </form>
  </SettingsPage>
</template>
