<template>
  <div class="uk-placeholder uk-margin-bottom-remove uk-margin-top-remove">
    <div
      v-if="value"
      class="uk-flex uk-flex-middle uk-margin-small-bottom"
    >
      <img
        class="image"
        :src="previewImage"
      >
      <input
        class="uk-form-small uk-flex-item-auto"
        v-model="value"
      >
      <a
        class="image__btn"
        target="_blank"
        :href="value"
      >
        <i class="uk-icon-search"></i>
      </a>
      <a
        class="image__btn"
        @click.prevent="$emit('input', '')"
      >
        <i class="uk-icon-close"></i>
      </a>
    </div>
    <hr v-if="value">
    <label class="uk-form-file uk-button uk-button-small uk-button-primary">
      <span class="util__nobreak">
        <i class="uk-icon-upload"></i> Upload new
      </span>
      <input
        class="upload-select"
        accept="image/x-png,image/png,image/gif,image/jpeg,image/svg+xml"
        type="file"
        @change="uploadImage"
      >
    </label>
  </div>
</template>

<script>
import upload from './utils/upload';

export default {
  props: {
    value: {
      type: String,
      required: true,
      default: '',
    },
    accessToken: {
      type: String,
      required: true,
    },
    apiClient: {
      type: Function,
      required: true,
    },
    spaceId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    previewImage() {
      return this.value.replace('a.storyblok.com', 'img2.storyblok.com/160x90/filters:fill(auto,0)');
    },
  },
  methods: {
    async uploadImage(e) {
      try {
        const data = await upload({
          accessToken: this.accessToken,
          client: this.apiClient,
          file: e.target.files[0],
          spaceId: this.spaceId,
        });
        this.$emit('input', data.pretty_url);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
