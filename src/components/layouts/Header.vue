<script setup>
import '../../assets/css/components/layouts/_header.scss';

defineProps({
  header: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <header class="header">
    <div v-for="group in header" :class="`header__${group.side}`">
      <template v-for="item in group.items">
        <div v-if="item.active && (!item.subitems || item.subitems.some(s => s.active))" class="header__item">
          <button v-if="item.subitems" class="header__subitem">
            <template v-for="(subitem, index) in item.subitems">
              <p v-if="subitem.active">
                <template v-if="subitem.value < 10">0</template
                >{{ subitem.value
                }}<span
                  v-if="
                    index < item.subitems.filter((s) => s.active).length - 1
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
          >
            <div v-if="item.icon" v-html="item.icon"></div>
            <template v-else>{{ item.value }}</template>
          </button>
        </div>
      </template>
    </div>
  </header>
</template>
