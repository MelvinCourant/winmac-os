<script setup>
import '../../../assets/css/components/apps/clock/_clock-button.scss';

defineProps({
  button: {
    type: Object,
    required: true,
  },
});

defineEmits(['clicked']);
</script>

<template>
  <button
    class="clock-button"
    :id="button.name"
    v-html="button.icon"
    v-if="button.display"
    @click="$emit('clicked', button.name)"
  ></button>
</template>
