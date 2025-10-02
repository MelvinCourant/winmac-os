<script setup>
import '../../assets/css/components/layouts/_desktop-apps.scss';
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
  <div class="desktop-apps">
    <AppIcon
      v-for="app in apps"
      :key="app.component"
      :app="app"
      location="desktop"
      @appIconClicked="$emit('appIconClicked', $event)"
    />
  </div>
</template>
