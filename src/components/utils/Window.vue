<script setup>
import '../../assets/css/components/utils/_window.scss';
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const AppComponent = defineAsyncComponent(
  () => import(`../apps/${props.app.component}.vue`),
);
</script>

<template>
  <div class="window">
    <AppComponent v-if="app.component" :app="app" />
  </div>
</template>
