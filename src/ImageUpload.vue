<template>
  <div class="uk-placeholder uk-margin-bottom-remove uk-margin-top-remove">
    <div v-if="value.src">
      <div class="uk-flex uk-flex-middle uk-margin-small-bottom">
        <img
          :src="previewImage"
          class="image"
        >
        <input
          :value="value.src"
          class="uk-form-small uk-flex-item-auto"
        >
        <a
          :href="value.src"
          class="image__btn"
          target="_blank"
        >
          <i class="uk-icon-search"/>
        </a>
        <a
          class="image__btn"
          @click.prevent="$emit(`input`, ``)"
        >
          <i class="uk-icon-close"/>
        </a>
      </div>
      <input
        v-model="value.alt"
        placeholder="Description"
        class="uk-form-small uk-width-1-1"
      >
    </div>
    <hr v-if="value.src">
    <label class="uk-form-file uk-button uk-button-small uk-button-primary">
      <span class="util__nobreak">
        <i class="uk-icon-upload"/> Upload new
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
  inject: [
    `plugin`,
  ],
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({
        alt: ``,
        src: ``,
      }),
    },
  },
  computed: {
    previewImage() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.value.src.replace(`a.storyblok.com`, `img2.storyblok.com/160x90/filters:fill(auto,0)`);
    },
  },
  methods: {
    async uploadImage(e) {
      try {
        const data = await upload({
          accessToken: this.plugin.options.accessToken,
          client: this.plugin.api.client,
          file: e.target.files[0],
          folderId: this.plugin.options.folderId,
          spaceId: this.plugin.spaceId,
        });
        this.$emit(`input`, {
          alt: this.value.alt,
          src: data.pretty_url,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
  },
};
</script>
