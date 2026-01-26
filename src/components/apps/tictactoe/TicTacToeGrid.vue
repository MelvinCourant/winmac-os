<script setup>
import '../../../assets/css/components/apps/tictactoe/_tictactoe-grid.scss';

defineProps({
  boxes: {
    type: Array,
    required: true,
  },
  playerRole: {
    type: String,
    required: true,
  },
  gameEnded: {
    type: Boolean,
    required: true,
  },
});
defineEmits(['boxSelected']);
</script>

<template>
  <div class="tictactoe-grid">
    <input
      type="button"
      :class="[
        'tictactoe-grid__box',
        { 'tictactoe-grid__box--highlighted': box.highlighted },
      ]"
      v-for="box in boxes"
      :key="box.id"
      :value="box.value"
      :disabled="playerRole === 'ai' || box.value || gameEnded"
      @click="$emit('boxSelected', box.id)"
    />
  </div>
</template>
