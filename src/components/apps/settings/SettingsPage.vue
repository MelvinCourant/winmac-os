<script setup>
import '../../../assets/css/components/apps/settings/_settings-page.scss';
import SettingsBack from './SettingsBack.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  display: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['back']);
</script>

<template>
  <div :class="['settings-page', { 'settings-page__hidden': !display }]">
    <SettingsBack @back="$emit('back')" />
    <h2 class="settings-page__title">{{ title }}</h2>
    <div class="settings-page__body">
      <slot></slot>
    </div>
  </div>
</template>
