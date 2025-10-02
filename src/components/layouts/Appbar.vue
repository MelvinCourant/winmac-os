<script setup>
import '../../assets/css/components/layouts/_appbar.scss';
import AppIcon from '../utils/AppIcon.vue';

defineProps({
  apps: {
    type: Array,
    required: true,
  },
});
defineEmits(['appIconClicked']);
</script>

<template>
  <div class="appbar">
    <div
      class="appbar__left"
      v-if="apps.filter((app) => app.name !== 'settings').length"
    >
      <AppIcon
        v-for="app in apps.filter((app) => app.name !== 'settings')"
        :app="app"
        location="appbar"
        @appIconClicked="$emit('appIconClicked', $event)"
      />
    </div>
    <div class="appbar__right">
      <AppIcon
        :app="apps.find((app) => app.name === 'settings')"
        location="appbar"
        @appIconClicked="$emit('appIconClicked', $event)"
      />
    </div>
  </div>
</template>
