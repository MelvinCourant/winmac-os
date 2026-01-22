<script setup>
import Window from '../window/Window.vue';
import { ref, watch } from 'vue';

const props = defineProps({
  windows: {
    type: Array,
    required: true,
  },
});
defineEmits(['actionClicked']);

const windowRefs = ref([]);
const zIndexes = ref([]);
const currentMaxZindex = ref(0);

function setWindowRef(el, index, windowName) {
  if (el) {
    windowRefs.value[index] = el;

    if (!zIndexes.value[index]) {
      zIndexes.value[index] = { index: index, name: windowName, zIndex: index };
    }
  }
}

defineExpose({ windowRefs, updateZIndexes });

function updateZIndexes(window) {
  const clickedElement = zIndexes.value.find(
    (el) => el && el.name === window.name,
  );

  if (!clickedElement) return;

  currentMaxZindex.value++;
  clickedElement.zIndex = currentMaxZindex.value;
}

watch(
  () => props.windows.length,
  (newLength, oldLength) => {
    if (newLength < oldLength) {
      const windowNames = props.windows.map((w) => w.name);

      zIndexes.value = zIndexes.value.filter((z) =>
        windowNames.includes(z.name),
      );
    }
  },
);
</script>

<template>
  <Window
    v-for="(window, index) in windows"
    :key="window.name"
    :app="window"
    :display="window.display"
    :isActive="zIndexes[index]?.zIndex === maxZIndex"
    :ref="(el) => setWindowRef(el, index, window.name)"
    :style="{ zIndex: zIndexes[index]?.zIndex ?? index }"
    @actionClicked="$emit('actionClicked', $event)"
    @windowGrabbed="updateZIndexes(window)"
  />
</template>
