import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useScoreStore = defineStore('score', () => {
  let localStorageScore = null;

  if (localStorage.getItem('wm-os-score')) {
    localStorageScore = JSON.parse(localStorage.getItem('wm-os-score') || '[]');
  }

  const score = ref([]);

  if (localStorageScore) {
    score.value = localStorageScore;
  }

  function updateScore(newScore) {
    let matchedScore = score.value.find((game) => game.id === newScore.id);

    if (!matchedScore) {
      score.value.push(newScore);
    } else {
      const index = score.value.indexOf(matchedScore);
      score.value[index] = newScore;
    }

    localStorage.setItem('wm-os-score', JSON.stringify(score.value));
  }

  return {
    score,
    updateScore,
  };
});
