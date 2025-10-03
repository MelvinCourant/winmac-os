<script setup>
import '../../../assets/css/components/apps/browser/_browser.scss';
import { inject, onMounted, ref } from 'vue';
import BrowserBar from './BrowserBar.vue';

const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
});

const tabs = ref([]);
const onAppMounted = inject('onAppMounted');

function getIframeContent(url, title) {
  if (onAppMounted) {
    onAppMounted('Browser');
  }

  const iframe = document.querySelector('.browser__iframe');
  const favicon = `/src/assets/imgs/apps/favicon/${props.app.image}.svg`;

  try {
    // Real title in production
    title = iframe.contentWindow.document.title || title;
  } catch (e) {}

  tabs.value.push({
    title: title,
    favicon: favicon,
    url: url,
  });
}
</script>

<template>
  <div class="browser">
    <BrowserBar :tabs="tabs" />
    <iframe
      class="browser__iframe"
      :src="app.url"
      @load="getIframeContent(app.url, app.title)"
    ></iframe>
  </div>
</template>
