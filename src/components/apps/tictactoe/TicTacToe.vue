<script setup>
import '../../../assets/css/components/apps/tictactoe/_tictactoe.scss';
import { computed, inject, onMounted, reactive, ref } from 'vue';
import TicTacToeHead from './TicTacToeHead.vue';
import TicTacToeGrid from './TicTacToeGrid.vue';
import Input from '../../inputs/Input.vue';
import { useScoreStore } from '../../../stores/score.js';
import Popin from '../../utils/Popin.vue';
import { v4 as uuidv4 } from 'uuid';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const onAppMounted = inject('onAppMounted');
onMounted(() => {
  if (onAppMounted) {
    onAppMounted('TicTacToe');
  }
});

const step = ref('players');
const players = ref([]);
const score = ref('0 - 0');
const scoreboard = useScoreStore().score;
const updateScore = useScoreStore().updateScore;
const popin = reactive({
  title: 'Scores',
  display: false,
  name: 'scoreboard',
});
const gameId = ref('');
const player1Input = ref('');
const player2Input = ref('');
const player1Attributes = computed(() => ({
  type: 'text',
  placeholder: 'Joueur 1',
  value: '',
  min: 3,
  max: 20,
}));
const player2Attributes = computed(() => ({
  type: 'text',
  placeholder: 'Joueur 2',
  value: '',
  min: 3,
  max: 20,
}));
const submitButtonAttributes = computed(() => ({
  type: 'submit',
  value: 'Sauvegarder',
}));
const tour = ref(0);
const boxes = reactive([
  { id: 0, value: null, highlighted: false },
  { id: 1, value: null, highlighted: false },
  { id: 2, value: null, highlighted: false },
  { id: 3, value: null, highlighted: false },
  { id: 4, value: null, highlighted: false },
  { id: 5, value: null, highlighted: false },
  { id: 6, value: null, highlighted: false },
  { id: 7, value: null, highlighted: false },
  { id: 8, value: null, highlighted: false },
]);
const gameEnded = ref(false);
const buttonAttributes = computed(() => ({
  type: 'button',
  value: 'Rejouer',
}));
const isGameSaved = computed(() => {
  return scoreboard.some((game) => game.id === gameId.value);
});
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame(nbPlayers) {
  gameId.value = uuidv4();

  if (nbPlayers === 1) {
    players.value.push(
      {
        id: 0,
        pseudo: 'Joueur 1',
        score: 0,
        role: 'player',
        symbol: 'x',
      },
      {
        id: 1,
        pseudo: 'IA',
        score: 0,
        role: 'ai',
        symbol: 'o',
      },
    );
  } else {
    players.value.push(
      {
        id: 0,
        score: 0,
        role: 'player',
        symbol: 'x',
      },
      {
        id: 1,
        score: 0,
        role: 'player',
        symbol: 'o',
      },
    );
  }

  step.value = 'game';
  tour.value = Math.floor(Math.random() * 2);

  if (players.value[tour.value].role === 'ai') {
    generateAIPlay();
  }
}

function restartGame() {
  boxes.forEach((box) => {
    box.value = null;
    box.highlighted = false;
  });
  tour.value = Math.floor(Math.random() * 2);
  gameEnded.value = false;

  if (players.value[tour.value].role === 'ai') {
    generateAIPlay();
  }
}

function reset() {
  boxes.forEach((box) => {
    box.value = null;
    box.highlighted = false;
  });
  score.value = '0 - 0';
  gameEnded.value = false;
  players.value = [];
  player1Input.value = '';
  player2Input.value = '';
  step.value = 'players';
}

function play(boxId) {
  const box = boxes[boxId];

  if (!box || box.value) return;

  const player = players.value[tour.value];

  box.value = player.symbol;

  verifyAlignment();
}

function verifyAlignment() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      boxes[a].value &&
      boxes[a].value === boxes[b].value &&
      boxes[a].value === boxes[c].value
    ) {
      gameEnded.value = true;
      boxes[a].highlighted = true;
      boxes[b].highlighted = true;
      boxes[c].highlighted = true;
      break;
    }
  }

  const availableBoxes = boxes.filter((box) => box.value === null);

  if (!availableBoxes.length && !gameEnded.value) {
    gameEnded.value = true;
    return;
  }

  if (!gameEnded.value) {
    if (tour.value === 0) {
      tour.value = 1;

      if (players.value[tour.value].role === 'ai') {
        generateAIPlay();
      }
    } else {
      tour.value = 0;
    }
  } else {
    players.value[tour.value].score++;
    score.value = `${players.value[0].score} - ${players.value[1].score}`;

    const gameOnScoreboard = scoreboard.find(
      (game) => game.id === gameId.value,
    );

    if (gameOnScoreboard) {
      updateScore({
        id: gameId.value,
        players: gameOnScoreboard.players,
        score: score.value,
      });
    }
  }
}

function generateAIPlay() {
  const availableBoxes = boxes.filter((box) => box.value === null);
  const generatedMove =
    availableBoxes[Math.floor(Math.random() * availableBoxes.length)];

  generatedMove.value = 'o';
  verifyAlignment();
}

function handleActions(action) {
  if (action === 'stats' && scoreboard.length) {
    popin.title = 'Scores';
    popin.name = 'scoreboard';
    popin.display = true;
  } else if (action === 'save') {
    popin.title = 'Sauvegarder votre score';
    popin.name = 'save';
    popin.display = true;
    player1Input.value = '';
    player2Input.value = '';
  } else if (action === 'reset') {
    reset();
  }
}

function submitScore() {
  const player1Pseudo = player1Input.value || 'Joueur 1';

  if (players.value[1].role === 'ai') {
    updateScore({
      id: gameId.value,
      players: `${player1Pseudo} VS IA`,
      score: score.value,
    });
  } else if (players.value[1].role === 'player') {
    const player2Pseudo =
      player2Input.value ||
      (players.value[1].role === 'ai' ? 'IA' : 'Joueur 2');

    updateScore({
      id: gameId.value,
      players: `${player1Pseudo} VS ${player2Pseudo}`,
      score: score.value,
    });
  }

  popin.display = false;
}
</script>

<template>
  <div class="tictactoe">
    <div class="tictactoe__players" v-if="step === 'players'">
      <button class="tictactoe__player-button" @click="startGame(1)">
        1 joueur
      </button>
      <button class="tictactoe__player-button" @click="startGame(2)">
        2 joueurs
      </button>
    </div>
    <div class="tictactoe__main" v-else>
      <TicTacToeHead
        :score="score"
        :gameEnded="gameEnded"
        :isGameSaved="isGameSaved"
        @click="handleActions"
      />
      <TicTacToeGrid
        :boxes="boxes"
        :playerRole="players[tour].role"
        :gameEnded="gameEnded"
        @boxSelected="play"
      />
      <Input
        :attributes="buttonAttributes"
        v-if="gameEnded"
        @click="restartGame"
      />
    </div>
    <Popin
      :title="popin.title"
      :display="popin.display"
      @hide="popin.display = false"
      @submit="submitScore"
    >
      <template v-if="popin.name === 'scoreboard'">
        <ul class="popin__list">
          <li v-for="line in scoreboard">
            <p>{{ line.players }}</p>
            <p>{{ line.score }}</p>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="popin__list">
          <Input
            :attributes="player1Attributes"
            @change="player1Input = $event.value"
          />
          <Input
            :attributes="player2Attributes"
            @change="player2Input = $event.value"
            v-if="players[1].role === 'player'"
          />
        </div>
        <Input :attributes="submitButtonAttributes" />
      </template>
    </Popin>
  </div>
</template>
