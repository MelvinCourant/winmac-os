<script setup>
import '../../../assets/css/components/apps/clock/_tabs.scss';

defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

defineEmits(['tabClicked']);
</script>

<template>
  <div class="tabs">
    <input
      :class="['tab', { 'tab--active': tab.active }]"
      type="button"
      v-for="tab in tabs"
      :value="tab.title"
      @click="
        () => {
          if (!tab.active) {
            $emit('tabClicked', tab);
          }
        }
      "
    />
  </div>
</template>
