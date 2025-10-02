<script setup>
import '../assets/css/views/_desktop.scss';
import Header from '../components/layouts/Header.vue';
import AppsJson from '../data/apps.json';
import DesktopApps from '../components/layouts/DesktopApps.vue';
import Windows from '../components/layouts/Windows.vue';
import { computed, nextTick, provide, ref, watch } from 'vue';
import { useSettingsStore } from '../stores/settings.js';

const settingsStore = useSettingsStore();
const { settings } = settingsStore;
const windows = ref([]);
const currentDay = ref(new Date().getDate());
const currentMonth = ref(new Date().getMonth() + 1);
const currentYear = ref(new Date().getFullYear());
const currentHours = ref(new Date().getHours());
const currentMinutes = ref(new Date().getMinutes());
const currentSeconds = ref(new Date().getSeconds());
const vibrationIcons = computed(() => [
  {
    icon:
      '<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '  <g clip-path="url(#vibration)">\n' +
      '    <path d="M0 10.5V5.5H1V10.5H0ZM2.775 12.5V3.5H3.775V12.5H2.775ZM20.1 10.5V5.5H21.1V10.5H20.1ZM17.325 12.5V3.5H18.325V12.5H17.325ZM7.175 16C6.725 16 6.34167 15.8417 6.025 15.525C5.70833 15.2083 5.55 14.825 5.55 14.375V1.625C5.55 1.175 5.70833 0.791667 6.025 0.475C6.34167 0.158333 6.725 0 7.175 0H13.925C14.375 0 14.7583 0.158333 15.075 0.475C15.3917 0.791667 15.55 1.175 15.55 1.625V14.375C15.55 14.825 15.3917 15.2083 15.075 15.525C14.7583 15.8417 14.375 16 13.925 16H7.175ZM7.175 15H13.925C14.1083 15 14.2583 14.9417 14.375 14.825C14.4917 14.7083 14.55 14.5583 14.55 14.375V1.625C14.55 1.44167 14.4917 1.29167 14.375 1.175C14.2583 1.05833 14.1083 1 13.925 1H7.175C6.99167 1 6.84167 1.05833 6.725 1.175C6.60833 1.29167 6.55 1.44167 6.55 1.625V14.375C6.55 14.5583 6.60833 14.7083 6.725 14.825C6.84167 14.9417 6.99167 15 7.175 15Z" fill="var(--white)"/>\n' +
      '  </g>\n' +
      '  <defs>\n' +
      '    <clipPath id="vibration-icon">\n' +
      '      <rect width="22" height="16" fill="var(--white)"/>\n' +
      '    </clipPath>\n' +
      '  </defs>\n' +
      '</svg>',
    display: settings.vibration.active,
  },
  {
    icon:
      '<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '  <path id="vibration-none" d="M0.526267 0.119623L0.00750732 0.855103L21.4181 15.9568L21.9369 15.2213L0.526267 0.119623Z" fill="var(--white)"/>\n' +
      '  <g clip-path="url(#vibration)">\n' +
      '    <path d="M0 10.5V5.5H1V10.5H0ZM2.775 12.5V3.5H3.775V12.5H2.775ZM20.1 10.5V5.5H21.1V10.5H20.1ZM17.325 12.5V3.5H18.325V12.5H17.325ZM7.175 16C6.725 16 6.34167 15.8417 6.025 15.525C5.70833 15.2083 5.55 14.825 5.55 14.375V1.625C5.55 1.175 5.70833 0.791667 6.025 0.475C6.34167 0.158333 6.725 0 7.175 0H13.925C14.375 0 14.7583 0.158333 15.075 0.475C15.3917 0.791667 15.55 1.175 15.55 1.625V14.375C15.55 14.825 15.3917 15.2083 15.075 15.525C14.7583 15.8417 14.375 16 13.925 16H7.175ZM7.175 15H13.925C14.1083 15 14.2583 14.9417 14.375 14.825C14.4917 14.7083 14.55 14.5583 14.55 14.375V1.625C14.55 1.44167 14.4917 1.29167 14.375 1.175C14.2583 1.05833 14.1083 1 13.925 1H7.175C6.99167 1 6.84167 1.05833 6.725 1.175C6.60833 1.29167 6.55 1.44167 6.55 1.625V14.375C6.55 14.5583 6.60833 14.7083 6.725 14.825C6.84167 14.9417 6.99167 15 7.175 15Z" fill="var(--white)"/>\n' +
      '  </g>\n' +
      '  <defs>\n' +
      '    <clipPath id="vibration-icon">\n' +
      '      <rect width="22" height="16" fill="var(--white)"/>\n' +
      '    </clipPath>\n' +
      '  </defs>\n' +
      '</svg>',
    display: !settings.vibration.active,
  },
]);
const batteryIcon = ref(
  '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="10" viewBox="0 0 22 10" fill="none">\n' +
    '  <path d="M3.72953 10C3.457 10 3.23184 9.90566 3.05406 9.71698C2.87545 9.5283 2.78614 9.29769 2.78614 9.02516V7.04402H0.77356V2.92453H2.78614V0.943396C2.78614 0.691824 2.87545 0.471699 3.05406 0.283019C3.23184 0.0943401 3.457 0 3.72953 0H21.0566C21.3291 0 21.5547 0.0943401 21.7333 0.283019C21.9111 0.471699 22 0.691824 22 0.943396V9.02516C22 9.31866 21.9111 9.5543 21.7333 9.73207C21.5547 9.91069 21.3291 10 21.0566 10H3.72953Z" fill="var(--color)"/>\n' +
    '</svg>',
);
const networkValue = ref('0ms');
const networkColor = ref('green');
const header = computed(() => [
  {
    side: 'left',
    items: [
      {
        name: 'date',
        displayIcon: settings.date.displayIcon || !settings.date,
        subitems: [
          {
            name: 'day',
            value: currentDay.value,
            displayIcon:
              settings.date.subitems.find((subitem) => subitem.name === 'day')
                .displayIcon || !settings.date,
          },
          {
            name: 'month',
            value: currentMonth.value,
            displayIcon:
              settings.date.subitems.find((subitem) => subitem.name === 'month')
                .displayIcon || !settings.date,
          },
          {
            name: 'year',
            value: currentYear.value,
            displayIcon:
              settings.date.subitems.find((subitem) => subitem.name === 'year')
                .displayIcon || !settings.date,
          },
        ],
      },
      {
        name: 'time',
        displayIcon: settings.time.displayIcon || !settings.time,
        subitems: [
          {
            name: 'hours',
            value: currentHours.value,
            displayIcon:
              settings.time.subitems.find((subitem) => subitem.name === 'hours')
                .displayIcon || !settings.time,
          },
          {
            name: 'minutes',
            value: currentMinutes.value,
            displayIcon:
              settings.time.subitems.find(
                (subitem) => subitem.name === 'minutes',
              ).displayIcon || !settings.time,
          },
          {
            name: 'seconds',
            value: currentSeconds.value,
            displayIcon:
              settings.time.subitems.find(
                (subitem) => subitem.name === 'seconds',
              ).displayIcon || !settings.time,
          },
        ],
      },
    ],
  },
  {
    side: 'right',
    items: [
      {
        name: 'vibration',
        icon: vibrationIcons.value.find((icon) => icon.display).icon,
        displayIcon: settings.vibration.displayIcon || !settings.vibration,
      },
      {
        name: 'battery',
        icon: batteryIcon.value,
        displayIcon: settings.battery.displayIcon || !settings.battery,
      },
      {
        name: 'network',
        value: networkValue.value,
        color: networkColor.value,
        displayIcon: settings.network.displayIcon || !settings.network,
      },
    ],
  },
]);
const batteryStatus = [
  {
    level: 0,
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="10" viewBox="0 0 22 10" fill="none">\n' +
      '  <path d="M2.95597 10C2.68344 10 2.45828 9.90566 2.2805 9.71698C2.10189 9.5283 2.01258 9.29769 2.01258 9.02516V7.04402H0V2.92453H2.01258V0.943396C2.01258 0.691824 2.10189 0.471699 2.2805 0.283019C2.45828 0.0943401 2.68344 0 2.95597 0H20.283C20.5556 0 20.7811 0.0943401 20.9597 0.283019C21.1375 0.471699 21.2264 0.691824 21.2264 0.943396V9.02516C21.2264 9.31866 21.1375 9.5543 20.9597 9.73207C20.7811 9.91069 20.5556 10 20.283 10H2.95597ZM3.14465 8.83648H20.0629V1.16352H3.14465V8.83648Z" fill="var(--color)"/>\n' +
      '</svg>',
  },
  {
    level: 0.25,
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="10" viewBox="0 0 22 10" fill="none">\n' +
      '  <path d="M2.95597 10C2.68344 10 2.45828 9.90566 2.2805 9.71698C2.10189 9.5283 2.01258 9.29769 2.01258 9.02516V7.04402H0V2.92453H2.01258V0.943396C2.01258 0.691824 2.10189 0.471699 2.2805 0.283019C2.45828 0.0943401 2.68344 0 2.95597 0H20.283C20.5556 0 20.7811 0.0943401 20.9597 0.283019C21.1375 0.471699 21.2264 0.691824 21.2264 0.943396V9.02516C21.2264 9.31866 21.1375 9.5543 20.9597 9.73207C20.7811 9.91069 20.5556 10 20.283 10H2.95597ZM3.14465 8.83648H16.2893V1.16352H3.14465V8.83648Z" fill="var(--color)"/>\n' +
      '</svg>',
  },
  {
    level: 0.5,
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="10" viewBox="0 0 22 10" fill="none">\n' +
      '  <path d="M2.95597 10C2.68344 10 2.45828 9.90566 2.2805 9.71698C2.10189 9.5283 2.01258 9.29769 2.01258 9.02516V7.04402H0V2.92453H2.01258V0.943396C2.01258 0.691824 2.10189 0.471699 2.2805 0.283019C2.45828 0.0943401 2.68344 0 2.95597 0H20.283C20.5556 0 20.7811 0.0943401 20.9597 0.283019C21.1375 0.471699 21.2264 0.691824 21.2264 0.943396V9.02516C21.2264 9.31866 21.1375 9.5543 20.9597 9.73207C20.7811 9.91069 20.5556 10 20.283 10H2.95597ZM3.14465 8.83648H11.6038V1.16352H3.14465V8.83648Z" fill="var(--color)"/>\n' +
      '</svg>',
  },
  {
    level: 0.75,
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="10" viewBox="0 0 22 10" fill="none">\n' +
      '  <path d="M2.95597 10C2.68344 10 2.45828 9.90566 2.2805 9.71698C2.10189 9.5283 2.01258 9.29769 2.01258 9.02516V7.04402H0V2.92453H2.01258V0.943396C2.01258 0.691824 2.10189 0.471699 2.2805 0.283019C2.45828 0.0943401 2.68344 0 2.95597 0H20.283C20.5556 0 20.7811 0.0943401 20.9597 0.283019C21.1375 0.471699 21.2264 0.691824 21.2264 0.943396V9.02516C21.2264 9.31866 21.1375 9.5543 20.9597 9.73207C20.7811 9.91069 20.5556 10 20.283 10H2.95597ZM3.14465 8.83648H7.95597V1.16352H3.14465V8.83648Z" fill="var(--color)"/>\n' +
      '</svg>',
  },
  {
    level: 1,
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="10" viewBox="0 0 22 10" fill="none">\n' +
      '  <path d="M2.95597 10C2.68344 10 2.45828 9.90566 2.2805 9.71698C2.10189 9.5283 2.01258 9.29769 2.01258 9.02516V7.04402H0V2.92453H2.01258V0.943396C2.01258 0.691824 2.10189 0.471699 2.2805 0.283019C2.45828 0.0943401 2.68344 0 2.95597 0H20.283C20.5556 0 20.7811 0.0943401 20.9597 0.283019C21.1375 0.471699 21.2264 0.691824 21.2264 0.943396V9.02516C21.2264 9.31866 21.1375 9.5543 20.9597 9.73207C20.7811 9.91069 20.5556 10 20.283 10H2.95597Z" fill="var(--color)"/>\n' +
      '</svg>',
  },
];
const pingRefreshTime = ref(settings.network.refreshTime * 1000 || 10000);
const pingIntervalId = ref(null);
const settingsPageToDisplayed = ref(null);
const mountedResolvers = ref({});

provide('displaySettingsPage', settingsPageToDisplayed);
provide('onAppMounted', (appName) => {
  if (mountedResolvers.value[appName]) {
    mountedResolvers.value[appName]();
    delete mountedResolvers.value[appName];
  }
});

watch(
  () => settings.network.refreshTime,
  (newRefreshTime) => {
    pingRefreshTime.value = newRefreshTime * 1000 || 10000;

    if (pingIntervalId.value) {
      clearInterval(pingIntervalId.value);
    }

    updatePing();
    pingIntervalId.value = setInterval(updatePing, pingRefreshTime.value);
  },
);

setInterval(updateDateTime, 1000);
navigator.getBattery().then((battery) => {
  updateBatteryIcon(battery);

  battery.addEventListener('levelchange', () => {
    updateBatteryIcon(battery);
  });
});
updatePing();
pingIntervalId.value = setInterval(updatePing, pingRefreshTime.value);

function updateBatteryIcon(battery) {
  let iconFind = false;

  batteryStatus.forEach((status) => {
    if (!iconFind && battery.level <= status.level) {
      batteryIcon.value = status.icon;
      iconFind = true;
    }
  });
}

function updateDateTime() {
  if (currentSeconds.value === 59) {
    currentSeconds.value = 0;

    if (currentMinutes.value === 59) {
      currentMinutes.value = 0;

      if (currentHours.value === 23) {
        currentHours.value = 0;

        currentDay.value = new Date().getDate();

        if (currentDay.value === 1) {
          currentMonth.value = new Date().getMonth() + 1;

          if (currentMonth.value === 1) {
            currentYear.value = new Date().getFullYear();
          }
        }
      } else {
        currentHours.value += 1;
      }
    } else {
      currentMinutes.value += 1;
    }
  } else {
    currentSeconds.value += 1;
  }
}

function updatePing() {
  const serverRequest = new XMLHttpRequest();
  const startTime = performance.now();

  serverRequest.open('GET', window.location.href, true);

  serverRequest.onload = function () {
    const endTime = performance.now();
    const responseTime = Math.round(endTime - startTime);

    if (serverRequest.status === 200) {
      networkValue.value = `${responseTime}ms`;

      if (responseTime < 50) {
        networkColor.value = 'green';
      } else if (responseTime >= 50 && responseTime < 100) {
        networkColor.value = 'yellow';
      } else if (responseTime >= 100) {
        networkColor.value = 'red';
      }
    }
  };

  serverRequest.send();
}

async function handleApp(app, shouldDisplay = true) {
  let existingWindow = windows.value.find((window) => window.name === app.name);

  if (existingWindow) {
    existingWindow.display = true;
    return;
  }

  windows.value.push({ ...app, display: false });

  await new Promise((resolve) => {
    mountedResolvers.value[app.name] = resolve;
  });

  existingWindow = windows.value.find((window) => window.name === app.name);

  if (existingWindow && shouldDisplay) {
    existingWindow.display = true;
  }
}

function handleCloseApp({ action, app }) {
  if (action.name === 'close') {
    windows.value.forEach((window) => {
      if (window.name === app.name) {
        windows.value.splice(windows.value.indexOf(window), 1);
      }
    });
  }
}

async function displaySettingsPage(settingsPage) {
  const settingsApp = AppsJson.find((app) => app.name === 'settings');

  await handleApp(settingsApp, false);

  settingsPageToDisplayed.value = settingsPage;

  await nextTick();

  const settingsWindow = windows.value.find(
    (window) => window.name === 'settings',
  );
  if (settingsWindow) {
    settingsWindow.display = true;
  }

  await nextTick();
  // Reset settings watch
  settingsPageToDisplayed.value = null;
}
</script>

<template>
  <main class="desktop">
    <h1 class="hidden-title">Winmac OS</h1>
    <Header :header="header" @click="displaySettingsPage" />
    <DesktopApps :apps="AppsJson" @appIconClicked="handleApp($event)" />
    <Windows :windows="windows" @actionClicked="handleCloseApp($event)" />
  </main>
</template>
