<script setup>
import '../../assets/css/components/inputs/_select.scss';
defineProps({
  label: {
    type: Object,
    default: () => {},
  },
  attributes: {
    type: Object,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});
defineEmits(['change']);
</script>

<template>
  <div class="select">
    <label v-bind="label.attributes" v-if="label">{{ label.text }}</label>
    <div class="select__field">
      <select
        v-bind="attributes"
        @change="$emit('change', $event.target.value)"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.selected"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
