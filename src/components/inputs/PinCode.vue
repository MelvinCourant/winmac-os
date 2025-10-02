<script setup>
import '../../assets/css/components/inputs/_pin-code.scss';
import { onUnmounted, ref, watch } from 'vue';
import { useSettingsStore } from '../../stores/settings.js';

const props = defineProps({
  size: {
    type: String,
    default: 'small',
  },
  quantity: {
    type: Number,
    default: 6,
  },
  vibrate: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['input']);

const { settings } = useSettingsStore();
const pinButtons = [
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '4', value: '4' },
  { text: '5', value: '5' },
  { text: '6', value: '6' },
  { text: '7', value: '7' },
  { text: '8', value: '8' },
  { text: '9', value: '9' },
  { text: '0', value: '0' },
  {
    text:
      '<svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '<path d="M18.789 25.8887L22.8516 21.8262L26.9142 25.8887L28.4907 24.3123L24.4281 20.2497L28.4907 16.1871L26.9142 14.6107L22.8516 18.6732L18.789 14.6107L17.2126 16.1871L21.2751 20.2497L17.2126 24.3123L18.789 25.8887ZM6.90503 20.2497L13.0386 11.5996C13.3404 11.156 13.7311 10.8101 14.2106 10.5618C14.6901 10.3136 15.2024 10.1895 15.7475 10.1895H30.3861C31.1336 10.1895 31.772 10.4541 32.3012 10.9833C32.8304 11.5125 33.095 12.1509 33.095 12.8983V27.6011C33.095 28.3486 32.8304 28.9869 32.3012 29.5161C31.772 30.0454 31.1336 30.31 30.3861 30.31H15.7504C15.1889 30.31 14.674 30.1808 14.2059 29.9223C13.7378 29.6639 13.3487 29.3129 13.0386 28.8693L6.90503 20.2497ZM9.62455 20.2497L14.9164 27.6927C14.9978 27.8046 15.1059 27.8987 15.2408 27.975C15.3756 28.0513 15.5218 28.0895 15.6796 28.0895H30.3861C30.5082 28.0895 30.6202 28.0386 30.7219 27.9369C30.8237 27.8351 30.8746 27.7232 30.8746 27.6011V12.8983C30.8746 12.7762 30.8237 12.6643 30.7219 12.5625C30.6202 12.4608 30.5082 12.4099 30.3861 12.4099H15.6834C15.5256 12.4099 15.3794 12.4481 15.2446 12.5244C15.1098 12.6007 15.0016 12.6948 14.9202 12.8068L9.62455 20.2497Z" fill="var(--color)"/>\n' +
      '</svg>\n',
    value: 'erase',
  },
];
const code = ref('');

function vibrate() {
  if (settings.vibration.active) {
    window.navigator.vibrate(200);
  }
}

watch(props.vibrate, (value) => {
  if (value) {
    vibrate();
  }
});

function tapPinCode(key) {
  vibrate();

  if (key === 'erase' && code.value.length > 0) {
    code.value = code.value.slice(0, -1);
    emit('input', code.value);
  } else if (key !== 'erase' && code.value.length < props.quantity) {
    code.value += key;
    emit('input', code.value);
  }
}

function keyboardTap(e) {
  e.stopImmediatePropagation();

  if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
    tapPinCode(e.key);
  } else if (e.key === 'Backspace') {
    tapPinCode('erase');
  }
}

window.addEventListener('keydown', keyboardTap);

onUnmounted(() => {
  window.removeEventListener('keydown', keyboardTap);
});
</script>

<template>
  <div
    :class="[`pin-code pin-code--${size}`, { 'pin-code--vibrate': vibrate }]"
  >
    <ul class="pin-code__dots">
      <li
        :class="[
          'pin-code__dot',
          { 'pin-code__dot--filled': code.length - 1 >= index },
        ]"
        v-for="(dot, index) in quantity"
      ></li>
    </ul>
    <div class="pin-code__buttons">
      <button
        v-for="button in pinButtons"
        class="pin-code__button"
        type="button"
        v-html="button.text"
        @click="tapPinCode(button.value)"
      ></button>
    </div>
  </div>
</template>
