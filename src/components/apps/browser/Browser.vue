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
const activeTabIndex = ref(0);
const onAppMounted = inject('onAppMounted');
const closeApp = inject('closeApp');
const onTabClosed = inject('onTabClosed');

onMounted(() => {
  if (tabs.value.length === 0 && props.app.url) {
    const favicon = `/src/assets/imgs/apps/favicon/${props.app.image}.svg`;
    tabs.value.push({
      title: props.app.title,
      favicon: favicon,
      url: props.app.url,
    });
  }
});

function handleCloseTab(index) {
  const closedTab = tabs.value[index];

  if (onTabClosed && closedTab) {
    onTabClosed(closedTab.url);
  }

  tabs.value.splice(index, 1);

  if (tabs.value.length === 0) {
    closeApp();
  } else if (activeTabIndex.value >= tabs.value.length) {
    activeTabIndex.value = tabs.value.length - 1;
  } else if (index < activeTabIndex.value) {
    activeTabIndex.value--;
  }
}

function setActiveTab(index) {
  activeTabIndex.value = index;
}

function addTab(url, title, image) {
  const existingTabIndex = tabs.value.findIndex((tab) => tab.url === url);

  if (existingTabIndex !== -1) {
    activeTabIndex.value = existingTabIndex;
    return;
  }

  const favicon = `/src/assets/imgs/apps/favicon/${image}.svg`;

  tabs.value.push({
    title: title,
    favicon: favicon,
    url: url,
  });

  activeTabIndex.value = tabs.value.length - 1;
}

function getIframeContent(index) {
  if (onAppMounted && tabs.value.length === 1) {
    onAppMounted('Browser');
  }

  const iframe = document.querySelector(
    `.browser__iframe[data-index="${index}"]`,
  );
  if (!iframe) return;

  try {
    // Real title in production
    const title = iframe.contentWindow.document.title;
    if (title && tabs.value[index]) {
      tabs.value[index].title = title;
    }
  } catch (e) {}
}

defineExpose({ addTab, tabs });
</script>

<template>
  <div class="browser">
    <BrowserBar
      :tabs="tabs"
      :activeTabIndex="activeTabIndex"
      @closeTab="handleCloseTab"
      @setActiveTab="setActiveTab"
    />
    <iframe
      v-for="(tab, index) in tabs"
      :key="index"
      class="browser__iframe"
      :data-index="index"
      :src="tab.url"
      v-show="index === activeTabIndex"
      @load="getIframeContent(index)"
    ></iframe>
  </div>
</template>
