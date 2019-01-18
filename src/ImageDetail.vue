<template>
  <div class="blok__comp-detail">
    <p v-if="!augmentedImage">
      No image selected, please upload an image first.
    </p>
    <template v-else>
      <p>
        <a
          class="detail-picker__remove"
          @click="$emit(`remove`)"
        >
          <i class="uk-icon-trash uk-margin-small-left"/>
        </a>
        Click on the image to set a marker for the detail position.
      </p>
      <div class="detail-picker">
        <img
          :src="augmentedImage.replace(`a.storyblok.com`, `img2.storyblok.com/300x0`)"
          @click="setCoordinates"
        >
        <span
          :style="`top:${y}%;left:${x}%;`"
          class="detail-picker__marker"
        />
      </div>
      <div class="uk-flex tree__form-group">
        <div>
          <label class="form__topic">
            X %
            <input
              v-model="x"
              class="uk-form-small"
              @input="updateValue"
            >
          </label>
        </div>

        <div class="uk-margin-small-left">
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
        <label
          :for="`title-${_uid}`"
          class="form__topic"
        >
          Title
        </label>
        <input
          :id="`title-${_uid}`"
          v-model="title"
          class="uk-width-1-1"
          @input="updateValue"
        >
      </div>

      <div class="tree__form-group">
        <label
          :for="`text-${_uid}`"
          class="form__topic"
        >
          Text
        </label>
        <textarea
          :id="`text-${_uid}`"
          v-model="text"
          class="uk-width-1-1"
          rows="5"
          @input="updateValue"
        />
      </div>

      <div class="tree__form-group">
        <span class="form__topic">
          Image
        </span>
        <ImageUpload
          v-model="image"
          @input="updateValue"
        />
      </div>
    </template>
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
      image: this.value.image,
      text: this.value.text,
      title: this.value.title,
      x: this.value.x,
      y: this.value.y,
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
.blok__comp-detail {
  padding: 15px;
  border: 1px solid #d4d4d4;
  border-radius: 3px;
}

.blok__comp-detail p:last-child {
  margin-bottom: 0;
}

.detail-picker {
  display: inline-block;
  position: relative;
}

.detail-picker__remove {
  float: right;
  color: #888;
  transition: color 0.2s;
}

.detail-picker__remove:hover,
.detail-picker__remove:focus {
  color: inherit;
}

.detail-picker__marker {
  position: absolute;
  margin-top: -8px;
  margin-left: -8px;
  width: 16px;
  height: 16px;
}

.detail-picker__marker::before,
.detail-picker__marker::after {
  position: absolute;
  background-color: #fff;
  content: '';
}

.detail-picker__marker::before {
  left: 7px;
  width: 2px;
  height: 100%;
}

.detail-picker__marker::after {
  top: 7px;
  width: 100%;
  height: 2px;
}
</style>
