<script setup>
import '../../../assets/css/components/apps/clock/_clock.scss';
import { inject, onMounted, reactive } from 'vue';
import Tabs from './Tabs.vue';

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
</script>

<template>
  <div class="clock">
    <Tabs :tabs="tabs" />
  </div>
</template>
