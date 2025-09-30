<script setup>
import Window from '../window/Window.vue';

defineProps({
  windows: {
    type: Array,
    required: true,
  },
});
defineEmits(['actionClicked']);
</script>

<template>
  <Window
    v-for="window in windows"
    :key="window.name"
    :app="window"
    :display="window.display"
    @actionClicked="$emit('actionClicked', $event)"
  />
</template>
