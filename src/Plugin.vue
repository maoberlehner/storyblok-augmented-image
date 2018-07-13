<template>
  <div>
    <image-upload v-model="model.image"/>

    <div class="blok__comp-container uk-margin-top">
      <image-detail
        v-for="(detail, index) in model.details"
        :key="index"
        :augmented-image="model.image"
        v-model="model.details[index]"
        @remove="removeDetail(index)"
      />
    </div>

    <a
      class="blok__full-btn uk-margin-small-top uk-margin-bottom-remove"
      @click="addDetail"
    >
      <i class="uk-icon-plus-circle uk-margin-small-right"/> Add detail
    </a>
  </div>
</template>

<script>
import ImageDetail from './ImageDetail.vue';
import ImageUpload from './ImageUpload.vue';

export default {
  components: {
    ImageDetail,
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
        details: [],
        image: ``,
        plugin: `augmented-image`,
      };
    },
    addDetail() {
      this.model.details.push({
        image: ``,
        text: ``,
        title: ``,
        x: 0,
        y: 0,
      });
    },
    removeDetail(index) {
      this.model.details = this.model.details.filter((_, i) => i !== index);
    },
  },
};
</script>

<style>
.blok__comp-container > :not(:first-child) {
  margin-top: 5px;
}
</style>
