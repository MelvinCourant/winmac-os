<script setup>
import '../../assets/css/components/inputs/_toggle.scss';

defineProps({
  label: {
    type: Object,
    default: () => {},
  },
  attributes: {
    type: Object,
    required: true,
  },
});
defineEmits(['change']);
</script>

<template>
  <label
    :class="['toggle', { 'toggle--disabled': attributes.disabled }]"
    v-bind="label.attributes"
    v-if="label"
    >{{ label.text }}
    <div class="toggle__switch">
      <input
        class="toggle__input"
        type="checkbox"
        v-bind="attributes"
        @change="$emit('change', $event.target.checked)"
      />
    </div>
  </label>
</template>
