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
const zIndexes = ref([]);

function setWindowRef(el, index, windowName) {
  if (el) {
    windowRefs.value[index] = el;
    if (!zIndexes.value[index]) {
      zIndexes.value[index] = { index: index, name: windowName, zIndex: index };
    }
  }
}

defineExpose({ windowRefs });

function updateZIndexes(window) {
  if (zIndexes.value.length <= 1) return;

  zIndexes.value.forEach((element) => {
    if (
      element &&
      element.name === window.name &&
      element.zIndex !== zIndexes.value.length - 1
    ) {
      const topElement = zIndexes.value.find(
        (el) => el && el.zIndex === zIndexes.value.length - 1,
      );
      if (topElement) {
        topElement.zIndex = element.zIndex;
        element.zIndex = zIndexes.value.length - 1;
      }
    }
  });
}
</script>

<template>
  <Window
    v-for="(window, index) in windows"
    :key="window.name"
    :app="window"
    :display="window.display"
    :ref="(el) => setWindowRef(el, index, window.name)"
    :style="{ zIndex: zIndexes[index]?.zIndex ?? index }"
    @actionClicked="$emit('actionClicked', $event)"
    @windowGrabbed="updateZIndexes(window)"
  />
</template>
