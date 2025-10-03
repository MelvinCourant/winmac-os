<script setup>
import '../../../assets/css/components/apps/browser/_browser-bar.scss';
import { computed } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTabIndex: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['closeTab', 'setActiveTab', 'reload']);

function handleCloseTab(index) {
  emit('closeTab', index);
}

function handleTabClick(index) {
  emit('setActiveTab', index);
}

const browserTabs = computed(() =>
  props.tabs.map((tab, index) => ({
    ...tab,
    active: index === props.activeTabIndex,
  })),
);
</script>

<template>
  <div class="browser-bar">
    <div class="browser-bar__tabs">
      <div
        :class="[
          'browser-bar__tab',
          { 'browser-bar__tab--active': tab.active },
        ]"
        v-for="(tab, index) in browserTabs"
        :key="index"
        @click="handleTabClick(index)"
      >
        <img
          class="browser-bar__favicon"
          :src="tab.favicon"
          :alt="`Favicon du site ${tab.title}`"
        />
        <h3 class="browser-bar__title">{{ tab.title }}</h3>
        <button class="browser-bar__close" @click.stop="handleCloseTab(index)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M0.555556 10L0 9.44444L4.44444 5L0 0.555556L0.555556 0L5 4.44444L9.44444 0L10 0.555556L5.55556 5L10 9.44444L9.44444 10L5 5.55556L0.555556 10Z"
              fill="var(--color)"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="browser-bar__search-bar-container">
      <div class="browser-bar__actions">
        <button class="browser-bar__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2.23702 6.58209L6.82321 11.1683L6 12L0 6L6 0L6.82321 0.831717L2.23702 5.41791H12V6.58209H2.23702Z"
              fill="var(--color)"
            />
          </svg>
        </button>
        <button class="browser-bar__button" disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M9.76299 6.58209H0V5.41791H9.76299L5.17679 0.831717L6 0L12 6L6 12L5.17679 11.1683L9.76299 6.58209Z"
              fill="var(--color)"
            />
          </svg>
        </button>
        <button class="browser-bar__button" @click.stop="$emit('reload')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
          >
            <path
              d="M6.01988 13.0197C4.34824 13.0197 2.92705 12.4344 1.75632 11.2639C0.585441 10.0933 0 8.6724 0 7.00121C0 5.33002 0.585441 3.90868 1.75632 2.7372C2.92705 1.56572 4.34824 0.97998 6.01988 0.97998C7.01046 0.97998 7.91846 1.20228 8.74387 1.64688C9.56914 2.09164 10.2554 2.6797 10.8025 3.41107V0.97998H11.9706V5.57598H7.37458V4.40817H10.0925C9.66393 3.72037 9.09339 3.17177 8.38089 2.76236C7.66853 2.3528 6.88153 2.14802 6.01988 2.14802C4.67214 2.14802 3.52657 2.61972 2.58316 3.56314C1.63974 4.50655 1.16804 5.65212 1.16804 6.99986C1.16804 8.34759 1.63974 9.49317 2.58316 10.4366C3.52657 11.38 4.67214 11.8517 6.01988 11.8517C7.27776 11.8517 8.35595 11.4361 9.25444 10.605C10.1529 9.77394 10.6696 8.75191 10.8043 7.53895H12C11.8768 9.09514 11.2458 10.3976 10.1071 11.4465C8.96842 12.4953 7.60601 13.0197 6.01988 13.0197Z"
              fill="var(--color)"
            />
          </svg>
        </button>
      </div>
      <div class="browser-bar__search-bar">
        <button class="browser-bar__button search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
          >
            <path
              d="M11.3031 12.5002L6.83404 8.03095C6.45885 8.31572 6.04746 8.53627 5.59986 8.6926C5.15226 8.84892 4.69034 8.92709 4.21411 8.92709C3.04377 8.92709 2.04884 8.51745 1.2293 7.69816C0.409767 6.87888 0 5.88438 0 4.71467C0 3.54508 0.409642 2.55021 1.22893 1.73005C2.04821 0.910018 3.04271 0.5 4.21242 0.5C5.382 0.5 6.37688 0.909767 7.19704 1.7293C8.01707 2.54884 8.42709 3.54377 8.42709 4.71411C8.42709 5.20473 8.34655 5.67384 8.18547 6.12143C8.02426 6.56916 7.80609 6.97336 7.53095 7.33404L12 11.8031L11.3031 12.5002ZM4.21354 7.95179C5.11787 7.95179 5.88363 7.63813 6.51082 7.01082C7.13813 6.38363 7.45179 5.61787 7.45179 4.71354C7.45179 3.80922 7.13813 3.04346 6.51082 2.41627C5.88363 1.78896 5.11787 1.4753 4.21354 1.4753C3.30922 1.4753 2.54346 1.78896 1.91627 2.41627C1.28896 3.04346 0.9753 3.80922 0.9753 4.71354C0.9753 5.61787 1.28896 6.38363 1.91627 7.01082C2.54346 7.63813 3.30922 7.95179 4.21354 7.95179Z"
              fill="var(--color)"
            />
          </svg>
        </button>
        <input
          type="text"
          :value="browserTabs.find((tab) => tab.active)?.url || ''"
        />
        <button class="browser-bar__button favourite">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              d="M4.32657 11.8062L7 10.2188L9.69432 11.8062L8.98419 8.79859L11.3026 6.8144L8.23228 6.54288L7 3.68148L5.76772 6.54288L2.69745 6.8144L5.0367 8.79859L4.32657 11.8062ZM2.67656 14.0506L3.83178 9.20984L0 5.95327L5.02542 5.51633L7 0.94873L8.97458 5.53721L14 5.95327L10.1682 9.20984L11.3234 14.0506L7 11.4833L2.67656 14.0506Z"
              fill="var(--color)"
            />
          </svg>
        </button>
      </div>
      <button class="browser-bar__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="12"
          viewBox="0 0 4 12"
          fill="none"
        >
          <path
            d="M1.99513 12C1.66217 12 1.37883 11.8814 1.14511 11.6443C0.911234 11.4072 0.794296 11.1222 0.794296 10.7894C0.794296 10.4565 0.912857 10.173 1.14998 9.93917C1.3871 9.70545 1.67206 9.58859 2.00487 9.58859C2.33783 9.58859 2.62117 9.70715 2.85489 9.94427C3.08877 10.1812 3.2057 10.4662 3.2057 10.7992C3.2057 11.1321 3.08714 11.4155 2.85002 11.6492C2.6129 11.8831 2.32794 12 1.99513 12ZM1.99513 7.2057C1.66217 7.2057 1.37883 7.08714 1.14511 6.85002C0.911234 6.6129 0.794296 6.32794 0.794296 5.99513C0.794296 5.66217 0.912857 5.37883 1.14998 5.14511C1.3871 4.91123 1.67206 4.7943 2.00487 4.7943C2.33783 4.7943 2.62117 4.91286 2.85489 5.14998C3.08877 5.3871 3.2057 5.67206 3.2057 6.00487C3.2057 6.33783 3.08714 6.62117 2.85002 6.85489C2.6129 7.08877 2.32794 7.2057 1.99513 7.2057ZM1.99513 2.41141C1.66217 2.41141 1.37883 2.29285 1.14511 2.05573C0.911234 1.81876 0.794296 1.5338 0.794296 1.20084C0.794296 0.867876 0.912857 0.584535 1.14998 0.350814C1.3871 0.116938 1.67206 0 2.00487 0C2.33783 0 2.62117 0.118561 2.85489 0.355683C3.08877 0.592805 3.2057 0.877768 3.2057 1.21057C3.2057 1.54353 3.08714 1.82695 2.85002 2.06083C2.6129 2.29455 2.32794 2.41141 1.99513 2.41141Z"
            fill="var(--color)"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
