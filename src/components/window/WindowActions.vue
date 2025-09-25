<script setup>
import '../../assets/css/components/window/_window-actions.scss';
import WindowButton from './WindowButton.vue';

defineProps({
  actions: {
    type: Array,
    required: true,
  },
});
defineEmits(['actionClicked']);
</script>

<template>
  <div class="window-actions">
    <WindowButton
      v-for="action in actions"
      :key="action.name"
      :action="action"
      v-show="action.isActive"
      @actionClicked="$emit('actionClicked', $event)"
    />
  </div>
</template>
