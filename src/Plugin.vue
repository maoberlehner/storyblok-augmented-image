<template>
  <div class="uk-placeholder uk-margin-bottom-remove uk-margin-top-remove">
    <div
      v-if="model.image"
      class="uk-flex uk-flex-middle uk-margin-small-bottom"
    >
      <img
        class="image"
        :src="previewImage"
      >
      <input
        class="uk-form-small uk-flex-item-auto"
        v-model="model.image"
      >
      <a
        class="image__btn"
        target="_blank"
        :href="model.image"
      >
        <i class="uk-icon-search"></i>
      </a>
      <a
        class="image__btn"
        @click.prevent="removeImage"
      >
        <i class="uk-icon-close"></i>
      </a>
    </div>
    <hr>
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
  mixins: [window.Storyblok.plugin],
  watch: {
    'model': {
      handler(value) {
        this.$emit('changed-model', value);
      },
      deep: true,
    },
  },
  computed: {
    previewImage() {
      return this.model.image.replace('a.storyblok.com', 'img2.storyblok.com/160x90/filters:fill(auto,0)');
    },
  },
  methods: {
    initWith() {
      return {
        plugin: 'augmented-image',
        title: 'Your title',
        description: 'Your description',
        image: null,
      };
    },
    pluginCreated() {
      console.log('plugin:created');
    },
    async uploadImage(e) {
      try {
        const data = await upload({
          accessToken: this.options.accessToken,
          client: this.api.client,
          file: e.target.files[0],
          spaceId: this.spaceId,
        });
        this.model.image = data.pretty_url;
      } catch (error) {
        console.log(error);
      }
    },
    removeImage() {},
  },
};
</script>
