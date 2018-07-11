<template>
  <div>
    <image-upload v-model="model.image"/>

    <div class="blok__comp-container">
      <image-augmentation
        v-for="(augmentation, index) in model.augmentations"
        :key="index"
        :augmented-image="model.image"
        v-model="model.augmentations[index]"
      />
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
import ImageAugmentation from './ImageAugmentation.vue';
import ImageUpload from './ImageUpload.vue';

export default {
  components: {
    ImageAugmentation,
    ImageUpload,
  },
  mixins: [window.Storyblok.plugin],
  provide() {
    return {
      plugin: this,
    };
  },
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
        text: ``,
        title: ``,
        x: 0,
        y: 0,
      });
    },
  },
};
</script>
