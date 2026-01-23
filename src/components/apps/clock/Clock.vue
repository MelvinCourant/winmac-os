<script setup>
import '../../../assets/css/components/apps/clock/_clock.scss';
import { inject, onMounted, reactive } from 'vue';
import Tabs from './Tabs.vue';
import TimeDate from './tabs/TimeDate.vue';
import Stopwatch from './tabs/Stopwatch.vue';
import Timer from './tabs/Timer.vue';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const onAppMounted = inject('onAppMounted');
onMounted(() => {
  if (onAppMounted) {
    onAppMounted('Clock');
  }
});

const tabs = reactive([
  {
    name: 'timedate',
    title: 'Horloge',
    active: true,
  },
  {
    name: 'stopwatch',
    title: 'Chronomètre',
    active: false,
  },
  {
    name: 'timer',
    title: 'Minuterie',
    active: false,
  },
]);

function updateTabs(tabSelected) {
  tabs.forEach((tab) => {
    if (tab.active && tab.name !== tabSelected.name) {
      tab.active = false;
    } else if (!tab.active && tab.name === tabSelected.name) {
      tab.active = true;
    }
  });
}
</script>

<template>
  <div class="clock">
    <TimeDate :active="tabs[0].active" />
    <Stopwatch :active="tabs[1].active" />
    <Timer :active="tabs[2].active" />
  </div>
  <Tabs :tabs="tabs" @tabClicked="updateTabs" />
</template>
