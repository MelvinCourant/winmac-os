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
    const favicon = `/../../imgs/apps/favicon/${props.app.image}.svg`;

    tabs.value.push({
      title: props.app.tabTitle,
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

  const favicon = `/../../imgs/apps/favicon/${image}.svg`;

  tabs.value.push({
    title: title,
    favicon: favicon,
    url: url,
  });

  activeTabIndex.value = tabs.value.length - 1;
}

function sendAppMounted() {
  if (onAppMounted && tabs.value.length === 1) {
    onAppMounted('Browser');
  }
}

function reloadIframe() {
  const iframe = document.querySelector(
    `.browser__iframe[data-index="${activeTabIndex.value}"]`,
  );
  if (iframe) {
    const currentSrc = iframe.src;
    iframe.src = currentSrc;
  }
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
      @reload="reloadIframe"
    />
    <iframe
      v-for="(tab, index) in tabs"
      :key="index"
      class="browser__iframe"
      :data-index="index"
      :src="tab.url"
      v-show="index === activeTabIndex"
      @load="sendAppMounted"
    ></iframe>
  </div>
</template>
