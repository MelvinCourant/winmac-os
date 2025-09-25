<script setup>
import '../../assets/css/components/window/_window-actions.scss';
import WindowButton from './WindowButton.vue';

defineProps({
  actions: {
    type: Array,
    required: true,
  },
});
defineEmits(['actionClicked', 'grabbing', 'cursorMove', 'stopGrabbing']);
</script>

<template>
  <div class="window-actions" @mousedown="$emit('grabbing', $event)">
    <WindowButton
      v-for="action in actions"
      :key="action.name"
      :action="action"
      v-show="action.isActive"
      @actionClicked="$emit('actionClicked', $event)"
    />
  </div>
</template>
