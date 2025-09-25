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
  <div class="windows">
    <Window
      v-for="window in windows"
      :app="window"
      @actionClicked="$emit('actionClicked', $event)"
    />
  </div>
</template>
