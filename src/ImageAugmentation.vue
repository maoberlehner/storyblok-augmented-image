<template>
  <div class="blok__comp-augmentation">
    <template v-if="augmentedImage">
      <p>Click on the image to set a marker for the augmentation position.</p>
      <div class="augmentation-picker">
        <img
          :src="augmentedImage.replace('a.storyblok.com', 'img2.storyblok.com/300x0')"
          @click="setCoordinates"
        >
        <span
          :style="`top:${y}%;left:${x}%;`"
          class="augmentation-picker__marker"
        />
      </div>
      <div class="uk-flex">
        <div class="uk-flex-item-auto tree__form-group">
          <label class="form__topic">
            X %
            <input
              v-model="x"
              class="uk-form-small"
              @input="updateValue"
            >
          </label>
        </div>

        <div class="uk-flex-item-auto uk-margin-small-left tree__form-group">
          <label class="form__topic">
            Y %
            <input
              v-model="y"
              class="uk-form-small"
              @input="updateValue"
            >
          </label>
        </div>
      </div>

      <div class="tree__form-group">
        <label class="form__topic" :for="`title-${_uid}`">
          Title
        </label>
        <input
          v-model="title"
          :id="`title-${_uid}`"
          class="uk-width-1-1"
          @input="updateValue"
        >
      </div>

      <div class="tree__form-group">
        <label class="form__topic" :for="`text-${_uid}`">
          Text
        </label>
        <textarea
          v-model="text"
          :id="`text-${_uid}`"
          class="uk-width-1-1"
          rows="5"
          @input="updateValue"
        />
      </div>

      <div class="tree__form-group">
        <span class="form__topic">
          Augmentation image
        </span>
        <image-upload
          v-model="image"
          @input="updateValue"
        />
      </div>
    </template>
    <p v-else>No image selected, please upload an image first.</p>
  </div>
</template>

<script>
import ImageUpload from './ImageUpload.vue';

export default {
  components: {
    ImageUpload,
  },
  props: {
    augmentedImage: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      image: ``,
      text: ``,
      title: ``,
      x: 0,
      y: 0,
    };
  },
  methods: {
    setCoordinates(e) {
      const { height, width } = e.target;

      this.x = parseFloat((e.offsetX / (width / 100)).toFixed(2));
      this.y = parseFloat((e.offsetY / (height / 100)).toFixed(2));

      this.updateValue();
    },
    updateValue() {
      this.$emit(`input`, {
        image: this.image,
        text: this.text,
        title: this.title,
        x: this.x,
        y: this.y,
      });
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

.blok__comp-augmentation p:last-child {
  margin-bottom: 0;
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
