<template>
  <div>
    <image-upload
      v-model="model.image"
      :access-token="options.accessToken"
      :api-client="api.client"
      :space-id="spaceId"
    />

    <div class="blok__comp-container">
      <div
        v-for="(augmentation, index) in model.augmentations"
        :key="index"
        class="blok__comp"
      >
        <div class="blok__comp-augmentation">
          <p>Click on the image to set a marker for the augmentation position.</p>
          <div class="augmentation-picker">
            <img
              :src="model.image.replace('a.storyblok.com', 'img2.storyblok.com/300x0')"
              @click="setCoordinates($event.target, $event.offsetX, $event.offsetY, augmentation)"
            >
            <span
              class="augmentation-picker__marker"
              :style="`top:${augmentation.y}%;left:${augmentation.x}%;`"
            >
            </span>
          </div>
          <div class="uk-flex">
            <div class="uk-flex-item-auto tree__form-group">
              <label class="form__topic" :for="`augmentation-x-${index}`">X %</label>
              <input
                :id="`augmentation-x-${index}`"
                class="uk-form-small"
                v-model="augmentation.x"
              >
            </div>

            <div class="uk-flex-item-auto uk-margin-small-left tree__form-group">
              <label class="form__topic" :for="`augmentation-y-${index}`">Y %</label>
              <input
                :id="`augmentation-Y-${index}`"
                class="uk-form-small"
                v-model="augmentation.y"
              >
            </div>
          </div>

          <div class="uk-flex-item-auto tree__form-group">
            <span class="form__topic" :for="`augmentation-x-${index}`">Augmentation image</span>
            <image-upload
              v-model="augmentation.image"
              :access-token="options.accessToken"
              :api-client="api.client"
              :space-id="spaceId"
            />
          </div>
        </div>
      </div>
    </div>

    <a
      class="blok__full-btn"
      @click="addAugmentation"
    >
      <i class="uk-icon-plus-circle uk-margin-small-right"></i> Add augmentation
    </a>
  </div>
</template>

<script>
import upload from './utils/upload';

import ImageUpload from './ImageUpload.vue';

export default {
  mixins: [window.Storyblok.plugin],
  components: {
    ImageUpload,
  },
  watch: {
    model: {
      handler(value) {
        this.$emit('changed-model', value);
      },
      deep: true,
    },
  },
  methods: {
    initWith() {
      return {
        augmentations: [],
        description: 'Your description',
        image: '',
        plugin: 'augmented-image',
        title: 'Your title',
      };
    },
    pluginCreated() {
      console.log('plugin:created');
    },
    addAugmentation() {
      this.model.augmentations.push({
        image: '',
        x: 0,
        y: 0,
      });
    },
    setCoordinates(element, offsetX, offsetY, augmentation) {
      const width = element.width;
      const height = element.height;

      augmentation.x = parseFloat((offsetX / (width / 100)).toFixed(2));
      augmentation.y = parseFloat((offsetY / (height / 100)).toFixed(2));
    },
  },
};
</script>

<style>
.blok__comp-augmentation {
  padding: 15px;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
}

.augmentation-picker {
  position: relative;
}

.augmentation-picker__marker {
  position: absolute;
  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-left: -8px;
}

.augmentation-picker__marker::before,
.augmentation-picker__marker::after {
  position: absolute;
  background-color: #fff;
  content: '';
}

.augmentation-picker__marker::before {
  width: 2px;
  height: 100%;
  left: 7px;
}

.augmentation-picker__marker::after {
  width: 100%;
  height: 2px;
  top: 7px;
}
</style>
