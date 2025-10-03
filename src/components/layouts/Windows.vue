<script setup>
import Window from '../window/Window.vue';
import { ref } from 'vue';

defineProps({
  windows: {
    type: Array,
    required: true,
  },
});
defineEmits(['actionClicked']);

const windowRefs = ref([]);

function setWindowRef(el, index) {
  if (el) {
    windowRefs.value[index] = el;
  }
}

defineExpose({ windowRefs });</script>

<template>
  <Window
    v-for="(window, index) in windows"
    :key="window.name"
    :app="window"
    :display="window.display"
    :ref="(el) => setWindowRef(el, index)"
    @actionClicked="$emit('actionClicked', $event)"
  />
</template>
