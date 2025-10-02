<script setup>
import SettingsPage from '../SettingsPage.vue';
import Toggle from '../../../inputs/Toggle.vue';
import { useSettingsStore } from '../../../../stores/settings.js';
import { computed, reactive, ref } from 'vue';
import Input from '../../../inputs/Input.vue';
import Select from '../../../inputs/Select.vue';
import Popin from '../../../utils/Popin.vue';
import PinCode from '../../../inputs/PinCode.vue';

defineProps({
  display: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['back']);

const settingsStore = useSettingsStore();
const { settings, updateSettings } = settingsStore;
const toggleLockingLabel = {
  text: 'Activer le verrouillage',
  attributes: {
    for: 'locking',
    class: 'settings-page__title-big',
  },
};
const toggleLockingAttributes = computed(() => ({
  id: 'locking',
  name: 'locking',
  checked: settings.security.active,
}));
const lockingMethodSelectLabel = {
  text: 'Méthode',
  attributes: {
    for: 'background-display',
    class: 'settings-page__title-small',
  },
};
const lockingMethodSelectAttributes = computed(() => ({
  id: 'locking-method',
  name: 'locking-method',
  disabled: !settings.security.active || !settings.security,
}));
const lockingMethodSelectOptions = reactive([
  {
    label: 'Aucune',
    value: 'none',
    selected: settings.security.method === 'none',
  },
  {
    label: 'Code PIN',
    value: 'pin',
    selected: settings.security.method === 'pin',
  },
  {
    label: 'Mot de passe',
    value: 'password',
    selected: settings.security.method === 'password',
  },
]);
const popin = reactive({
  title: 'Code PIN',
  display: false,
  method: 'none',
});
const passwordAttributes = computed(() => ({
  type: 'password',
  placeholder: 'Mot de passe',
  value: '',
  max: 20,
}));
const saveButtonAttributes = computed(() => ({
  type: 'submit',
  value: 'Sauvegarder',
}));
const password = ref('');
const vibrate = ref(false);
const error = ref('');

function updatePopin(method) {
  popin.method = method;
  error.value = '';
  password.value = '';

  if (method === 'password') {
    popin.title = 'Mot de passe';
    passwordAttributes.value.value = '';
  } else if (method === 'pin') {
    popin.title = 'Code PIN';
  }

  if (method !== 'none') {
    popin.display = true;
  }
}

function submitPassword() {
  if (
    (popin.method === 'pin' && password.value.length === 6) ||
    (popin.method === 'password' && password.value.length > 3)
  ) {
    updateSettings({
      security: {
        active: settings.security.active,
        method: popin.method,
        password: password.value,
      },
    });

    popin.display = false;
  } else {
    if (popin.method === 'password') {
      passwordAttributes.value.value = password.value;
      error.value = 'Le mot de passe doit faire un minimum de 4 caracteres.';
    }

    vibrate.value = true;

    setTimeout(() => {
      vibrate.value = false;
    }, 200);
  }
}
</script>

<template>
  <SettingsPage title="Sécurité" :display="display" @back="$emit('back')">
    <form class="settings-page__group">
      <Toggle
        :label="toggleLockingLabel"
        :attributes="toggleLockingAttributes"
        @change="
          updateSettings({
            security: {
              active: $event,
              method: settings.security.method,
              password: settings.security.password,
            },
          })
        "
      />
      <Select
        :label="lockingMethodSelectLabel"
        :attributes="lockingMethodSelectAttributes"
        :options="lockingMethodSelectOptions"
        @change="updatePopin"
      />
    </form>
    <Popin
      :title="popin.title"
      :display="popin.display"
      @hide="popin.display = false"
      @submit="submitPassword"
    >
      <PinCode
        v-if="popin.method === 'pin'"
        @input="password = $event"
        :vibrate="vibrate"
      />
      <Input
        v-if="popin.method === 'password'"
        :attributes="passwordAttributes"
        @change="password = $event.value"
        :vibrate="vibrate"
        :error="error"
      />
      <Input :attributes="saveButtonAttributes" />
    </Popin>
  </SettingsPage>
</template>
