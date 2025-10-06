<script setup>
import '../../../assets/css/components/apps/calculator/_calculator.scss';
import { inject, onMounted, ref } from 'vue';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const onAppMounted = inject('onAppMounted');
onMounted(() => {
  if (onAppMounted) {
    onAppMounted('Calculator');
  }
});

const intermediaryResult = ref('');
const result = ref('');
const calculationElements = ref([]);
const padButtons = [
  {
    side: 'top',
    buttons: [
      {
        key: 'Delete',
        value: 'CE',
      },
      {
        key: 'Backspace',
        value: 'C',
      },
    ],
  },
  {
    side: 'center',
    buttons: [
      {
        key: '7',
        value: '7',
      },
      {
        key: '8',
        value: '8',
      },
      {
        key: '9',
        value: '9',
      },
      {
        key: '4',
        value: '4',
      },
      {
        key: '5',
        value: '5',
      },
      {
        key: '6',
        value: '6',
      },
      {
        key: '1',
        value: '1',
      },
      {
        key: '2',
        value: '2',
      },
      {
        key: '3',
        value: '3',
      },
    ],
  },
  {
    side: 'bottom',
    buttons: [
      {
        key: 'positiveNegative',
        value: '+/-',
      },
      {
        key: '0',
        value: '0',
      },
      {
        key: '.',
        value: '.',
      },
    ],
  },
  {
    side: 'right',
    buttons: [
      {
        key: '/',
        value: '÷',
      },
      {
        key: '*',
        value: '×',
      },
      {
        key: '-',
        value: '-',
      },
      {
        key: '+',
        value: '+',
      },
      {
        key: '=',
        value: '=',
      },
    ],
  },
];
const keysToSkipped = [
  '=',
  'c',
  'C',
  'Backspace',
  'Delete',
  'positiveNegative',
];

function padTyping(key) {
  const lastCalculationElement =
    calculationElements.value[calculationElements.value.length - 1];

  padButtons.forEach((side) => {
    side.buttons.forEach((button) => {
      if (key === button.key && !keysToSkipped.includes(key)) {
        if (calculationElements.value.length) {
          if (
            (parseInt(key) >= 0 && parseFloat(lastCalculationElement) > 0) ||
            (parseInt(key) >= 0 && lastCalculationElement === '-') ||
            (parseInt(key) >= 0 && lastCalculationElement.endsWith('.')) ||
            (key === '.' && !lastCalculationElement.match(/\./))
          ) {
            const isFirstElement = calculationElements.value.length === 1;
            const hasParenthesesInDisplay =
              parseFloat(lastCalculationElement) < 0 && !isFirstElement;

            calculationElements.value[calculationElements.value.length - 1] +=
              button.key;

            if (hasParenthesesInDisplay) {
              result.value = result.value.slice(0, -1) + button.value + ')';
            } else {
              result.value += button.value;
            }
          } else if (
            (!parseInt(key) &&
              parseFloat(lastCalculationElement) &&
              key !== '.') ||
            (parseInt(key) >= 0 &&
              !parseFloat(lastCalculationElement) &&
              parseFloat(lastCalculationElement) !== 0)
          ) {
            calculationElements.value.push(button.key);
            result.value += button.value;
          } else if (
            (!parseInt(key) && !parseFloat(lastCalculationElement)) ||
            (parseInt(key) >= 0 && parseFloat(lastCalculationElement) === 0)
          ) {
            calculationElements.value[calculationElements.value.length - 1] =
              button.key;
            result.value = result.value.slice(0, -1);
            result.value += button.value;
          }
        } else {
          if (parseInt(key) >= 0 || key === '-') {
            calculationElements.value.push(button.key);
            result.value += button.value;
          }
        }
      }
    });
  });

  if (key === 'Backspace' || key.toLowerCase() === 'c') {
    const isFirstElement = calculationElements.value.length === 1;
    const isNegative = lastCalculationElement.startsWith('-');

    if (isNegative && lastCalculationElement.length === 2) {
      calculationElements.value[calculationElements.value.length - 1] =
        lastCalculationElement.slice(1);

      if (isFirstElement) {
        result.value = result.value.slice(0, -2);
      } else {
        result.value = result.value.slice(0, -4);
      }
      result.value += lastCalculationElement.slice(1);
    } else if (
      parseInt(lastCalculationElement) &&
      lastCalculationElement.length > 1
    ) {
      calculationElements.value[calculationElements.value.length - 1] =
        lastCalculationElement.slice(0, -1);

      if (isNegative && !isFirstElement) {
        result.value = result.value.slice(0, -2) + ')';
      } else {
        result.value = result.value.slice(0, -1);
      }
    } else {
      calculationElements.value.pop();
      result.value = result.value.slice(0, -1);
    }
  } else if (key === 'Delete') {
    intermediaryResult.value = '';
    result.value = '';
    calculationElements.value = [];
  } else if (key === 'positiveNegative') {
    if (!parseFloat(lastCalculationElement)) return;

    const isFirstElement = calculationElements.value.length === 1;
    let newValue, displayValue;

    if (parseFloat(lastCalculationElement) >= 0) {
      newValue = '-' + lastCalculationElement;

      if (isFirstElement) {
        displayValue = '-' + lastCalculationElement;
      } else {
        displayValue = '(-' + lastCalculationElement + ')';
      }
    } else {
      newValue = lastCalculationElement.slice(1);
      displayValue = newValue;
    }

    calculationElements.value[calculationElements.value.length - 1] = newValue;

    const oldDisplayLength =
      parseFloat(lastCalculationElement) < 0 && !isFirstElement
        ? lastCalculationElement.length + 2
        : lastCalculationElement.length;

    result.value = result.value.slice(0, -oldDisplayLength) + displayValue;
  } else if (key === '=' || key === 'Enter') {
    calculate();
  }
}

function calculate() {
  if (
    !parseInt(calculationElements.value[calculationElements.value.length - 1])
  ) {
    calculationElements.value.pop();
    result.value = result.value.slice(0, -1);
  }

  const calculation = eval(calculationElements.value.join(''));

  intermediaryResult.value = result.value;
  result.value = calculation.toString();
  calculationElements.value = [calculation.toString()];
}

window.addEventListener('keydown', (e) => padTyping(e.key));
</script>

<template>
  <div class="calculator">
    <div class="calculator__calculation">
      <div
        :class="[
          'calculator__intermediary-result',
          { 'calculator__intermediary-result--small': result.length > 15 },
        ]"
        v-show="intermediaryResult"
      >
        {{ intermediaryResult }}
      </div>
      <div
        :class="[
          'calculator__result',
          { 'calculator__result--small': result.length > 15 },
        ]"
      >
        {{ result }}
      </div>
    </div>
    <div class="calculator__pad">
      <div
        v-for="group in padButtons"
        :class="`calculator__pad--${group.side}`"
      >
        <input
          v-for="button in group.buttons"
          :key="button.key"
          class="calculator__button"
          type="button"
          :value="button.value"
          @click="padTyping(button.key)"
        />
      </div>
    </div>
  </div>
</template>
