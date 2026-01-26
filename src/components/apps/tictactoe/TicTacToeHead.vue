<script setup>
import '../../../assets/css/components/apps/tictactoe/_tictactoe-head.scss';

defineProps({
  score: {
    type: String,
    required: true,
  },
  gameEnded: {
    type: Boolean,
    required: true,
  },
  isGameSaved: {
    type: Boolean,
    required: true,
  },
});
defineEmits(['click']);
</script>

<template>
  <div class="tictactoe-head">
    <div class="tictactoe-head__left-buttons">
      <button class="tictactoe-head__button" @click="$emit('click', 'stats')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="18"
          viewBox="0 0 21 18"
          fill="none"
        >
          <path
            d="M0.80597 17.194H6.44776V7.25373H0.80597V17.194ZM7.25373 17.194H12.8955V0.80597H7.25373V17.194ZM13.7015 17.194H19.3433V9.40299H13.7015V17.194ZM0 18V6.44776H6.44776V0H13.7015V8.59702H20.1493V18H0Z"
            fill="var(--color)"
          />
        </svg>
      </button>
      <button
        class="tictactoe-head__button"
        @click="$emit('click', 'save')"
        v-if="gameEnded && !isGameSaved"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M18 3.7987V18H0V0H14.2013L18 3.7987ZM17.1818 4.14935L13.8506 0.818182H0.818182V17.1818H17.1818V4.14935ZM8.99299 13.7922C9.54312 13.7922 10.013 13.5997 10.4026 13.2148C10.7922 12.8297 10.987 12.3621 10.987 11.8122C10.987 11.2621 10.7945 10.7922 10.4096 10.4026C10.0245 10.013 9.55695 9.81818 9.00701 9.81818C8.45688 9.81818 7.98701 10.0106 7.5974 10.3956C7.20779 10.7807 7.01299 11.2482 7.01299 11.7982C7.01299 12.3483 7.20545 12.8182 7.59039 13.2078C7.97552 13.5974 8.44305 13.7922 8.99299 13.7922ZM3.15584 6.31169H11.2792V3.15584H3.15584V6.31169ZM0.818182 4.14935V17.1818V0.818182V4.14935Z"
            fill="var(--color)"
          />
        </svg>
      </button>
    </div>
    <p class="tictactoe-head__score">{{ score }}</p>
    <button class="tictactoe-head__button" @click="$emit('click', 'reset')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M9 18C6.50202 18 4.37746 17.1249 2.62633 15.3748C0.875444 13.6246 0 11.5011 0 9.00435C0 6.50758 0.875444 4.38266 2.62633 2.6296C4.37746 0.876533 6.50202 0 9 0C10.6282 0 12.1045 0.391694 13.4289 1.17508C14.753 1.95871 15.8151 2.9879 16.6152 4.26266V0H17.7765V6.14141H11.635V4.98012H15.6633C14.9803 3.82246 14.0563 2.89657 12.8914 2.20246C11.7262 1.50835 10.4291 1.16129 9 1.16129C6.82258 1.16129 4.97177 1.92339 3.44758 3.44758C1.92339 4.97177 1.16129 6.82258 1.16129 9C1.16129 11.1774 1.92339 13.0282 3.44758 14.5524C4.97177 16.0766 6.82258 16.8387 9 16.8387C11.0323 16.8387 12.7742 16.1673 14.2258 14.8246C15.6774 13.4819 16.5121 11.8306 16.7298 9.87097H17.9078C17.7273 12.1899 16.7894 14.1244 15.0939 15.6745C13.3984 17.2248 11.3671 18 9 18Z"
          fill="var(--color)"
        />
      </svg>
    </button>
  </div>
</template>
