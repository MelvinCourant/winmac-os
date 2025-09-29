<script setup>
import SettingsPage from '../SettingsPage.vue';
import { computed, reactive, ref, onMounted } from 'vue';
import Select from '../../../inputs/Select.vue';
import { useSettingsStore } from '../../../../stores/settings.js';
import Input from '../../../inputs/Input.vue';

const settingsStore = useSettingsStore();
const { settings, updateSettings } = settingsStore;

const imageDimensions = ref({ width: 1920, height: 1080 });

defineProps({
  display: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['back']);

const themeSelectLabel = {
  text: "Thème de l'OS",
  attributes: {
    for: 'theme',
    class: 'settings-page__title-big',
  },
};
const themeSelectAttributes = {
  id: 'theme',
  name: 'theme',
};
const themeSelectOptions = reactive([
  {
    label: 'Thème du système',
    value: 'system',
    selected: settings.theme === 'system',
  },
  {
    label: 'Sombre',
    value: 'dark',
    selected: settings.theme === 'dark',
  },
  {
    label: 'Clair',
    value: 'light',
    selected: settings.theme === 'light',
  },
  {
    label: 'Personnalisable',
    value: 'custom',
    selected: settings.theme === 'custom',
  },
]);
const wallpaperStyle = computed(() => {
  const baseStyle = {
    backgroundImage: `url(${
      (settings.wallpaper.image && settings.wallpaper.image === 'background') ||
      !settings
        ? new URL('../../../../assets/imgs/background.jpg', import.meta.url)
            .href
        : settings.wallpaper.image
    })`,
  };

  if (settings.wallpaper.display === 'repeat') {
    baseStyle.backgroundRepeat = settings.wallpaper.display;
    baseStyle.backgroundSize = '20%';
  } else if (settings.wallpaper.display === 'center') {
    const referenceWidth = 1920;
    const actualImageWidth = imageDimensions.value.width;
    const scaleFactor = actualImageWidth / referenceWidth;
    const scaledSize = Math.round(scaleFactor * 100);
    baseStyle.backgroundSize = `${scaledSize}%`;
    baseStyle.backgroundRepeat = 'no-repeat';
  } else {
    baseStyle.backgroundSize = settings.wallpaper.display;
    baseStyle.backgroundRepeat = 'no-repeat';
  }

  return baseStyle;
});
const wallpaperLabel = {
  text: "Fond d'écran",
  attributes: {
    for: 'wallpaper',
    class: 'settings-page__title-big',
  },
};
const wallpaperAttributes = {
  id: 'wallpaper',
  name: 'wallpaper',
  type: 'file',
  accept: 'image/png, image/jpeg, image/jpg, image/webp, image/gif',
  text: 'Importer une image',
};
const wallpaperDisplaySelectLabel = {
  text: 'Affichage',
  attributes: {
    for: 'background-display',
    class: 'settings-page__title-small',
  },
};
const wallpaperDisplaySelectAttributes = {
  id: 'background-display',
  name: 'background-display',
};
const wallpaperDisplaySelectOptions = reactive([
  {
    label: "Occuper tout l'écran",
    value: 'cover',
    selected: settings.wallpaper.display === 'cover',
  },
  {
    label: "Adapter à l'écran",
    value: 'contain',
    selected: settings.wallpaper.display === 'contain',
  },
  {
    label: 'Centrer',
    value: 'center',
    selected: settings.wallpaper.display === 'center',
  },
  {
    label: 'Mosaïque',
    value: 'repeat',
    selected: settings.wallpaper.display === 'repeat',
  },
]);
const resetAttributes = computed(() => ({
  type: 'button',
  value: "Réinitialiser le fond d'écran",
  disabled: settings.wallpaper.image === 'background',
}));

function updateTheme(theme) {
  updateSettings({
    theme: theme,
  });
}

function getImageDimensions(imageSrc) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      resolve({ width: this.width, height: this.height });
    };
    img.src = imageSrc;
  });
}

async function updateImageBackground(image) {
  if (!image.files || image.files.length === 0) {
    return;
  }
  const file = image.files[0];
  const reader = new FileReader();
  reader.onloadend = async function () {
    const imageData = reader.result;

    imageDimensions.value = await getImageDimensions(imageData);

    updateSettings({
      wallpaper: {
        image: imageData,
        display: settings.wallpaper.display,
      },
    });
  };
  reader.readAsDataURL(file);
}

function updateBackgroundDisplay(display) {
  updateSettings({
    wallpaper: {
      image: settings.wallpaper.image,
      display: display,
    },
  });
}

async function resetBackgroundImage() {
  updateSettings({
    wallpaper: {
      image: 'background',
      display: settings.wallpaper.display,
    },
  });

  imageDimensions.value = await getImageDimensions(
    new URL('../../../../assets/imgs/background.jpg', import.meta.url).href,
  );
}

onMounted(async () => {
  const currentImageSrc =
    (settings.wallpaper.image && settings.wallpaper.image === 'background') ||
    !settings
      ? new URL('../../../../assets/imgs/background.jpg', import.meta.url).href
      : settings.wallpaper.image;

  imageDimensions.value = await getImageDimensions(currentImageSrc);
});
</script>

<template>
  <SettingsPage title="Apparence" :display="display" @back="$emit('back')">
    <form class="settings-page__group">
      <Select
        :label="themeSelectLabel"
        :attributes="themeSelectAttributes"
        :options="themeSelectOptions"
        @change="updateTheme"
      />
    </form>
    <form class="settings-page__group">
      <Input
        :label="wallpaperLabel"
        :attributes="wallpaperAttributes"
        @change="updateImageBackground"
      />
      <Select
        :label="wallpaperDisplaySelectLabel"
        :attributes="wallpaperDisplaySelectAttributes"
        :options="wallpaperDisplaySelectOptions"
        @change="updateBackgroundDisplay"
      />
      <div class="settings-page__row">
        <div
          class="settings-page__image wallpaper"
          v-if="wallpaperStyle.backgroundImage"
        >
          <div class="settings-page__preview" :style="wallpaperStyle"></div>
        </div>
        <Input :attributes="resetAttributes" @click="resetBackgroundImage" />
      </div>
    </form>
  </SettingsPage>
</template>
