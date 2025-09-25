<script setup>
import '../../assets/css/components/window/_window-button.scss';

defineProps({
  action: {
    type: Object,
    required: true,
  },
});
defineEmits(['actionClicked']);
</script>

<template>
  <button
    :class="`window-button window-button--${action.style}`"
    v-html="action.svg"
    :title="action.title"
    @click="$emit('actionClicked', action)"
  ></button>
</template>
