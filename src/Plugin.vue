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
              :style="`top:${augmentation.y}%;left:${augmentation.x}%;`"
              class="augmentation-picker__marker"
            />
          </div>
          <div class="uk-flex">
            <div class="uk-flex-item-auto tree__form-group">
              <label
                :for="`augmentation-x-${index}`"
                class="form__topic"
              >
                X %
              </label>
              <input
                :id="`augmentation-x-${index}`"
                v-model="augmentation.x"
                class="uk-form-small"
              >
            </div>

            <div class="uk-flex-item-auto uk-margin-small-left tree__form-group">
              <label
                :for="`augmentation-y-${index}`"
                class="form__topic"
              >
                Y %
              </label>
              <input
                :id="`augmentation-Y-${index}`"
                v-model="augmentation.y"
                class="uk-form-small"
              >
            </div>
          </div>

          <div class="uk-flex-item-auto tree__form-group">
            <span
              :for="`augmentation-x-${index}`"
              class="form__topic"
            >
              Augmentation image
            </span>
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
      <i class="uk-icon-plus-circle uk-margin-small-right"/> Add augmentation
    </a>
  </div>
</template>

<script>
import ImageUpload from './ImageUpload.vue';

export default {
  components: {
    ImageUpload,
  },
  mixins: [window.Storyblok.plugin],
  watch: {
    model: {
      handler(value) {
        this.$emit(`changed-model`, value);
      },
      deep: true,
    },
  },
  methods: {
    initWith() {
      return {
        augmentations: [],
        description: `Your description`,
        image: ``,
        plugin: `augmented-image`,
        title: `Your title`,
      };
    },
    addAugmentation() {
      this.model.augmentations.push({
        image: ``,
        x: 0,
        y: 0,
      });
    },
    setCoordinates(element, offsetX, offsetY, augmentation) {
      const { height, width } = element;

      // eslint-disable-next-line no-param-reassign
      augmentation.x = parseFloat((offsetX / (width / 100)).toFixed(2));
      // eslint-disable-next-line no-param-reassign
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
  margin-top: -8px;
  margin-left: -8px;
  width: 16px;
  height: 16px;
}

.augmentation-picker__marker::before,
.augmentation-picker__marker::after {
  position: absolute;
  background-color: #fff;
  content: '';
}

.augmentation-picker__marker::before {
  left: 7px;
  width: 2px;
  height: 100%;
}

.augmentation-picker__marker::after {
  top: 7px;
  width: 100%;
  height: 2px;
}
</style>
