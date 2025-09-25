<script setup>
import '../../assets/css/components/utils/_app-icon.scss';

defineProps({
  app: {
    type: Object,
    required: true,
  },
});
defineEmits(['appIconClicked']);

function generateUrl(src) {
  return new URL(`../../assets/imgs/apps/${src}.svg`, import.meta.url).href;
}
</script>

<template>
  <button
    class="app-icon"
    :title="`Ouvrir l'application ${app.title}`"
    @click="$emit('appIconClicked', app)"
  >
    <img
      class="app-icon__image"
      :src="generateUrl(app.image)"
      :alt="`Icône de l'application ${app.title}`"
    />
    <h3 class="app-icon__name">{{ app.title }}</h3>
  </button>
</template>
