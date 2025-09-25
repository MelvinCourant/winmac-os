<script setup>
import '../../assets/css/components/window/_window.scss';
import { defineAsyncComponent, reactive } from 'vue';
import WindowActions from './WindowActions.vue';

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});
defineEmits(['actionClicked']);

const AppComponent = defineAsyncComponent(
  () => import(`../apps/${props.app.name}/${props.app.component}.vue`),
);

const actions = reactive([
  {
    name: 'minimize',
    style: 'normal',
    title: 'Minimiser la fenêtre',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">\n' +
      '  <mask id="mask0_1_1714" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">\n' +
      '    <rect x="0.5" width="20" height="20" fill="var(--color)"/>\n' +
      '  </mask>\n' +
      '  <g mask="url(#mask0_1_1714)">\n' +
      '    <path d="M5.91662 17.0833V16.25H15.0833V17.0833H5.91662Z" fill="var(--color)"/>\n' +
      '  </g>\n' +
      '</svg>',
    isActive: true,
  },
  {
    name: 'maximize',
    style: 'normal',
    title: 'Agrandir la fenêtre',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">\n' +
      '  <mask id="mask0_1_1697" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">\n' +
      '    <rect x="0.5" width="20" height="20" fill="var(--color)"/>\n' +
      '  </mask>\n' +
      '  <g mask="url(#mask0_1_1697)">\n' +
      '    <path d="M5.22913 16.5421C4.86802 16.5421 4.56608 16.4207 4.3233 16.1779C4.07996 15.9346 3.9583 15.6324 3.9583 15.2713V4.72959C3.9583 4.36848 4.07996 4.06626 4.3233 3.82292C4.56608 3.58014 4.86802 3.45876 5.22913 3.45876H15.7708C16.1319 3.45876 16.4341 3.58014 16.6775 3.82292C16.9202 4.06626 17.0416 4.36848 17.0416 4.72959V15.2713C17.0416 15.6324 16.9202 15.9346 16.6775 16.1779C16.4341 16.4207 16.1319 16.5421 15.7708 16.5421H5.22913ZM5.22913 15.7921H15.7708C15.8958 15.7921 16.0139 15.7365 16.125 15.6254C16.2361 15.5143 16.2916 15.3963 16.2916 15.2713V4.72959C16.2916 4.60459 16.2361 4.48653 16.125 4.37542C16.0139 4.26431 15.8958 4.20876 15.7708 4.20876H5.22913C5.10413 4.20876 4.98608 4.26431 4.87496 4.37542C4.76385 4.48653 4.7083 4.60459 4.7083 4.72959V15.2713C4.7083 15.3963 4.76385 15.5143 4.87496 15.6254C4.98608 15.7365 5.10413 15.7921 5.22913 15.7921Z" fill="var(--color)"/>\n' +
      '  </g>\n' +
      '</svg>',
    isActive: true,
  },
  {
    name: 'reduce',
    style: 'normal',
    title: 'Reduire la fenêtre',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">\n' +
      '  <mask id="mask0_1_1705" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">\n' +
      '    <rect x="0.5" width="20" height="20" fill="var(--color)"/>\n' +
      '  </mask>\n' +
      '  <g mask="url(#mask0_1_1705)">\n' +
      '    <path d="M5.37405 16.5403C4.93805 16.5403 4.57617 16.4218 4.28841 16.1848C4.00003 15.9473 3.85583 15.6491 3.85583 15.29V6.53794H4.79012V15.29C4.79012 15.4054 4.85241 15.5144 4.97698 15.617C5.10155 15.7196 5.23391 15.7709 5.37405 15.7709H13.1987V16.5403H5.37405ZM8.17691 14.2321C7.74091 14.2321 7.37903 14.1136 7.09127 13.8766C6.80288 13.6391 6.65869 13.3408 6.65869 12.9818V4.69136C6.65869 4.34512 6.80288 4.05326 7.09127 3.81576C7.37903 3.57879 7.74091 3.4603 8.17691 3.4603H15.441C15.8614 3.4603 16.2158 3.57879 16.5042 3.81576C16.792 4.05326 16.9358 4.34512 16.9358 4.69136V12.9818C16.9358 13.3408 16.792 13.6391 16.5042 13.8766C16.2158 14.1136 15.8614 14.2321 15.441 14.2321H8.17691ZM8.17691 13.4626H15.441C15.5811 13.4626 15.7097 13.4114 15.8268 13.3088C15.9433 13.2062 16.0015 13.0972 16.0015 12.9818V4.69136C16.0015 4.57594 15.9433 4.47002 15.8268 4.37359C15.7097 4.27767 15.5811 4.22971 15.441 4.22971H8.17691C8.03676 4.22971 7.90441 4.27767 7.77983 4.37359C7.65526 4.47002 7.59298 4.57594 7.59298 4.69136V12.9818C7.59298 13.0972 7.65526 13.2062 7.77983 13.3088C7.90441 13.4114 8.03676 13.4626 8.17691 13.4626Z" fill="var(--color)"/>\n' +
      '  </g>\n' +
      '</svg>',
    isActive: false,
  },
  {
    name: 'close',
    style: 'danger',
    title: 'Fermer la fenêtre',
    svg:
      '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">\n' +
      '  <mask id="mask0_1_1688" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">\n' +
      '    <rect x="0.5" width="20" height="20" fill="var(--color)"/>\n' +
      '  </mask>\n' +
      '  <g mask="url(#mask0_1_1688)">\n' +
      '    <path d="M5.83324 15.2504L5.24991 14.667L9.91657 10.0004L5.24991 5.3337L5.83324 4.75037L10.4999 9.41703L15.1666 4.75037L15.7499 5.3337L11.0832 10.0004L15.7499 14.667L15.1666 15.2504L10.4999 10.5837L5.83324 15.2504Z" fill="var(--color)"/>\n' +
      '  </g>\n' +
      '</svg>',
    isActive: true,
  },
]);

function handleActions(actionSelected) {
  actions.forEach((action) => {
    if (action.name === actionSelected.name) {
      if (actionSelected.name === 'maximize' && actionSelected.isActive) {
        actionSelected.isActive = false;

        actions.find((action) => action.name === 'reduce').isActive = true;
      } else if (actionSelected.name === 'reduce' && actionSelected.isActive) {
        actionSelected.isActive = false;

        actions.find((action) => action.name === 'maximize').isActive = true;
      }
    }
  });
}
</script>

<template>
  <div class="window">
    <WindowActions
      :actions="actions"
      @actionClicked="
        handleActions($event);
        $emit('actionClicked', { action: $event, app });
      "
    />
    <AppComponent v-if="app.component" :app="app" />
  </div>
</template>
