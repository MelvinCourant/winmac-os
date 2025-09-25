<script setup>
import '../../assets/css/components/utils/_app-icon.scss';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});

function generateUrl(src) {
  return new URL(`../../assets/imgs/apps/${src}.svg`, import.meta.url).href;
}
</script>

<template>
  <button class="app-icon" :title="`Ouvrir l'application ${app.name}`">
    <img
      :src="generateUrl(app.image)"
      :alt="`Icône de l'application ${app.name}`"
    />
    <h3 class="app-icon__name">{{ app.name }}</h3>
  </button>
</template>
