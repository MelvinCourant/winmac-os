<script setup>
import '../../assets/css/components/layouts/_header.scss';

defineProps({
  header: {
    type: Array,
    required: true,
  },
});

defineEmits(['click']);
</script>

<template>
  <header class="header">
    <template v-for="group in header">
      <div
        :class="`header__${group.side}`"
        v-show="
          group.side === 'left' ||
          (group.side === 'right' &&
            group.items.some(
              (item) =>
                item.displayIcon &&
                (!item.subitems || item.subitems.some((s) => s.displayIcon)),
            ))
        "
      >
        <template v-for="item in group.items">
          <div
            v-if="
              item.displayIcon &&
              (!item.subitems || item.subitems.some((s) => s.displayIcon))
            "
            class="header__item"
          >
            <button
              v-if="item.subitems"
              class="header__subitem"
              @click="
                $emit(
                  'click',
                  item.name === 'date' || item.name === 'time'
                    ? 'date-time'
                    : item.name,
                )
              "
            >
              <template v-for="(subitem, index) in item.subitems">
                <p v-if="subitem.displayIcon">
                  <template v-if="subitem.value < 10">0</template
                  >{{ subitem.value
                  }}<span
                    v-if="
                      item.subitems.slice(index + 1).some((s) => s.displayIcon)
                    "
                    class="header__subitem-divider"
                  >
                    <template v-if="item.name === 'date'">/</template>
                    <template v-else>:</template>
                  </span>
                </p>
              </template>
            </button>
            <button
              v-else
              class="header__item-button"
              :style="{ color: item.color ? `var(--${item.color})` : '' }"
              @click="$emit('click', item.name)"
            >
              <div v-if="item.icon" v-html="item.icon"></div>
              <template v-else>{{ item.value }}</template>
            </button>
          </div>
        </template>
      </div>
    </template>
  </header>
</template>
