<script setup>
import SettingsPage from '../SettingsPage.vue';
import Toggle from '../../../inputs/Toggle.vue';
import { useSettingsStore } from '../../../../stores/settings.js';
import { computed } from 'vue';

defineProps({
  display: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['back']);

const settingsStore = useSettingsStore();
const { settings, updateSettings } = settingsStore;
const togglesDate = computed(() => ({
  label: {
    text: 'Date',
    attributes: {
      for: 'date',
      class: 'settings-page__title-big',
    },
  },
  attributes: {
    id: 'date',
    name: 'date',
    checked: settings.date.active || !settings.date,
  },
  subitems: [
    {
      label: {
        text: 'Jour',
        attribute: {
          for: 'day',
          class: 'settings-page__title-small',
        },
      },
      attributes: {
        id: 'day',
        name: 'day',
        checked:
          settings.date.subitems.find((subitem) => subitem.name === 'day')
            .active || !settings.date,
        disabled: !settings.date.active,
      },
    },
    {
      label: {
        text: 'Mois',
        attribute: {
          for: 'month',
          class: 'settings-page__title-small',
        },
      },
      attributes: {
        id: 'month',
        name: 'month',
        checked:
          settings.date.subitems.find((subitem) => subitem.name === 'month')
            .active || !settings.date,
        disabled: !settings.date.active,
      },
    },
    {
      label: {
        text: 'Année',
        attribute: {
          for: 'year',
          class: 'settings-page__title-small',
        },
      },
      attributes: {
        id: 'year',
        name: 'year',
        checked:
          settings.date.subitems.find((subitem) => subitem.name === 'year')
            .active || !settings.date,
        disabled: !settings.date.active,
      },
    },
  ],
}));
const togglesTime = computed(() => ({
  label: {
    text: 'Heure',
    attributes: {
      for: 'time',
      class: 'settings-page__title-big',
    },
  },
  attributes: {
    id: 'time',
    name: 'time',
    checked: settings.time.active || !settings.time,
  },
  subitems: [
    {
      label: {
        text: 'Heures',
        attribute: {
          for: 'hours',
          class: 'settings-page__title-small',
        },
      },
      attributes: {
        id: 'hours',
        name: 'hours',
        checked:
          settings.time.subitems.find((subitem) => subitem.name === 'hours')
            .active || !settings.time,
        disabled: !settings.time.active,
      },
    },
    {
      label: {
        text: 'Minutes',
        attribute: {
          for: 'minutes',
          class: 'settings-page__title-small',
        },
      },
      attributes: {
        id: 'minutes',
        name: 'minutes',
        checked:
          settings.time.subitems.find((subitem) => subitem.name === 'minutes')
            .active || !settings.time,
        disabled: !settings.time.active,
      },
    },
    {
      label: {
        text: 'Secondes',
        attribute: {
          for: 'seconds',
          class: 'settings-page__title-small',
        },
      },
      attributes: {
        id: 'seconds',
        name: 'seconds',
        checked:
          settings.time.subitems.find((subitem) => subitem.name === 'seconds')
            .active || !settings.time,
        disabled: !settings.time.active,
      },
    },
  ],
}));

function updateSubitemSettings(item, name, value) {
  let subitems;

  if (item === 'date') {
    subitems = settings.date.subitems;

    subitems.forEach((subitem) => {
      if (subitem.name === name) {
        subitem.active = value;
      }
    });

    updateSettings({
      date: {
        active: settings.date.active,
        subitems: subitems,
      },
    });
  } else {
    subitems = settings.time.subitems;

    subitems.forEach((subitem) => {
      if (subitem.name === name) {
        subitem.active = value;
      }
    });

    updateSettings({
      time: {
        active: settings.time.active,
        subitems: subitems,
      },
    });
  }
}
</script>

<template>
  <SettingsPage title="Date et heure" :display="display" @back="$emit('back')">
    <form class="settings-page__group">
      <Toggle
        :label="togglesDate.label"
        :attributes="togglesDate.attributes"
        @change="
          updateSettings({
            date: {
              active: $event,
              subitems: [...settings.date.subitems],
            },
          })
        "
      />
      <Toggle
        v-for="subitem in togglesDate.subitems"
        :key="subitem.attributes.id"
        :label="subitem.label"
        :attributes="subitem.attributes"
        @change="updateSubitemSettings('date', subitem.attributes.id, $event)"
      />
    </form>
    <form class="settings-page__group">
      <Toggle
        :label="togglesTime.label"
        :attributes="togglesTime.attributes"
        @change="
          updateSettings({
            time: {
              active: $event,
              subitems: [...settings.time.subitems],
            },
          })
        "
      />
      <Toggle
        v-for="subitem in togglesTime.subitems"
        :key="subitem.attributes.id"
        :label="subitem.label"
        :attributes="subitem.attributes"
        @change="updateSubitemSettings('time', subitem.attributes.id, $event)"
      />
    </form>
  </SettingsPage>
</template>
