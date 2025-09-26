<script setup>
import '../assets/css/views/_desktop.scss';
import Header from '../components/layouts/Header.vue';
import AppsJson from '../data/apps.json';
import DesktopApps from '../components/layouts/DesktopApps.vue';
import Windows from '../components/layouts/Windows.vue';
import { reactive, ref } from 'vue';

const windows = ref([]);
const header = reactive([
  {
    side: 'left',
    items: [
      {
        name: 'date',
        active: true,
        subitems: [
          {
            name: 'day',
            value: new Date().getDate(),
            active: true,
          },
          {
            name: 'month',
            value: new Date().getMonth() + 1,
            active: true,
          },
          {
            name: 'year',
            value: new Date().getFullYear(),
            active: true,
          },
        ],
      },
      {
        name: 'time',
        active: true,
        subitems: [
          {
            name: 'hours',
            value: new Date().getHours(),
            active: true,
          },
          {
            name: 'minutes',
            value: new Date().getMinutes(),
            active: true,
          },
          {
            name: 'seconds',
            value: new Date().getSeconds(),
            active: true,
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
        icon:
          '<svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">\n' +
          '  <g clip-path="url(#clip0_146_1215)">\n' +
          '    <path d="M1.47351 10.4V5.50001H2.37351V10.4H1.47351ZM4.17351 12.4V3.60001H5.07351V12.5H4.17351V12.4ZM21.1735 10.4V5.50001H22.0735V10.4H21.1735ZM18.4735 12.4V3.60001H19.3735V12.5H18.4735V12.4ZM8.47351 15.8C8.07351 15.8 7.67351 15.7 7.37351 15.4C7.07351 15.1 6.87351 14.7 6.87351 14.3V1.70001C6.87351 1.30001 7.07351 0.900012 7.37351 0.600012C7.67351 0.300012 8.07351 0.200012 8.47351 0.200012H15.1735C15.5735 0.200012 15.9735 0.300012 16.2735 0.600012C16.5735 0.900012 16.6735 1.30001 16.6735 1.70001V14.3C16.6735 14.7 16.5735 15.1 16.2735 15.4C15.9735 15.7 15.5735 15.8 15.1735 15.8H8.47351ZM8.47351 14.9H15.1735C15.3735 14.9 15.4735 14.8 15.5735 14.7C15.6735 14.6 15.7735 14.4 15.7735 14.2V1.70001C15.7735 1.50001 15.6735 1.40001 15.5735 1.20001C15.4735 1.10001 15.2735 1.00001 15.1735 1.00001H8.47351C8.27351 1.00001 8.07351 1.10001 7.97351 1.20001C7.87351 1.30001 7.77351 1.50001 7.77351 1.70001V14.3C7.77351 14.5 7.87351 14.6 7.97351 14.8C8.07351 14.9 8.27351 14.9 8.47351 14.9Z" fill="var(--color)"/>\n' +
          '    <path d="M1.29977 0.119592L0.781006 0.855072L22.1916 15.9568L22.7104 15.2213L1.29977 0.119592Z" fill="var(--color)"/>\n' +
          '  </g>\n' +
          '  <defs>\n' +
          '    <clipPath id="clip0_146_1215">\n' +
          '      <rect width="22" height="16" fill="white" transform="translate(0.77356)"/>\n' +
          '    </clipPath>\n' +
          '  </defs>\n' +
          '</svg>',
        active: true,
      },
      {
        name: 'battery',
        icon:
          '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="10" viewBox="0 0 22 10" fill="none">\n' +
          '  <path d="M3.72953 10C3.457 10 3.23184 9.90566 3.05406 9.71698C2.87545 9.5283 2.78614 9.29769 2.78614 9.02516V7.04402H0.77356V2.92453H2.78614V0.943396C2.78614 0.691824 2.87545 0.471699 3.05406 0.283019C3.23184 0.0943401 3.457 0 3.72953 0H21.0566C21.3291 0 21.5547 0.0943401 21.7333 0.283019C21.9111 0.471699 22 0.691824 22 0.943396V9.02516C22 9.31866 21.9111 9.5543 21.7333 9.73207C21.5547 9.91069 21.3291 10 21.0566 10H3.72953Z" fill="var(--color)"/>\n' +
          '</svg>',
        active: true,
      },
      {
        name: 'network',
        value: '0ms',
        color: 'green',
        active: true,
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

setInterval(updateDateTime, 1000);
navigator.getBattery().then((battery) => {
  updateBatteryIcon(battery);

  battery.addEventListener('levelchange', () => {
    updateBatteryIcon(battery);
  });
});

function updateBatteryIcon(battery) {
  let iconFind = false;
  const headerBattery = header
    .find((group) => group.side === 'right')
    .items.find((item) => item.name === 'battery');

  batteryStatus.forEach((status) => {
    if (!iconFind && battery.level <= status.level) {
      headerBattery.icon = status.icon;
      iconFind = true;
    }
  });
}

function updateDateTime() {
  const headerLeft = header.find((group) => group.side === 'left');
  const time = headerLeft.items.find((item) => item.name === 'time');
  const date = headerLeft.items.find((item) => item.name === 'date');

  let seconds = time.subitems.find(
    (subitem) => subitem.name === 'seconds',
  ).value;
  let minutes = time.subitems.find(
    (subitem) => subitem.name === 'minutes',
  ).value;
  let hours = time.subitems.find((subitem) => subitem.name === 'hours').value;
  let day = date.subitems.find((subitem) => subitem.name === 'day').value;
  let month = date.subitems.find((subitem) => subitem.name === 'month').value;
  let year = date.subitems.find((subitem) => subitem.name === 'year').value;

  if (seconds === 59) {
    seconds = 0;

    if (minutes === 59) {
      minutes = 0;

      if (hours === 23) {
        hours = 0;

        day = new Date().getDate();

        if (day === 1) {
          month = new Date().getMonth() + 1;

          if (month === 1) {
            year = new Date().getFullYear();
          }
        }
      } else {
        hours += 1;
      }
    } else {
      minutes += 1;
    }
  } else {
    seconds += 1;
  }

  time.subitems.forEach((subitem) => {
    if (subitem.name === 'seconds') {
      subitem.value = seconds;
    } else if (subitem.name === 'minutes') {
      subitem.value = minutes;
    } else {
      subitem.value = hours;
    }
  });

  date.subitems.forEach((subitem) => {
    if (subitem.name === 'day') {
      subitem.value = day;
    } else if (subitem.name === 'month') {
      subitem.value = month;
    } else if (subitem.name === 'year') {
      subitem.value = year;
    }
  });
}

function handleApp(app) {
  let appIsOpened = false;

  windows.value.forEach((window) => {
    if (window.name === app.name) {
      appIsOpened = true;
    }
  });

  if (!appIsOpened) {
    windows.value.push(app);
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
</script>

<template>
  <main class="desktop">
    <h1 class="hidden-title">Winmac OS</h1>
    <Header :header="header" />
    <DesktopApps :apps="AppsJson" @appIconClicked="handleApp($event)" />
    <Windows :windows="windows" @actionClicked="handleCloseApp($event)" />
  </main>
</template>
