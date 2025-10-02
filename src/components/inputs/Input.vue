<script setup>
import '../../assets/css/components/inputs/_input.scss';

defineProps({
  label: {
    type: Object,
    default: () => {},
  },
  attributes: {
    type: Object,
    required: true,
  },
  vibrate: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
});
defineEmits(['change', 'click']);
</script>

<template>
  <div :class="['input', { 'input--disabled': attributes.disabled }]">
    <label v-bind="label.attributes" v-if="label">{{ label.text }}</label>
    <div class="input__wrapper" v-if="attributes.type === 'file'">
      {{ attributes.text }}
      <input
        v-bind="attributes"
        :class="`input--${attributes.type}`"
        @change="$emit('change', $event.target)"
      />
    </div>
    <input
      v-else
      v-bind="attributes"
      :class="[`input--${attributes.type}`, { 'input--vibrate': vibrate }]"
      @change="$emit('change', $event.target)"
      @click="$emit('click')"
    />
    <div class="input__error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>
