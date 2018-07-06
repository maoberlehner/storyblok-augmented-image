<template>
  <div>
    <image-upload
      v-model="model.image"
      :access-token="options.accessToken"
      :api-client="api.client"
      :space-id="spaceId"
    />
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
        description: 'Your description',
        image: '',
        plugin: 'augmented-image',
        title: 'Your title',
      };
    },
    pluginCreated() {
      console.log('plugin:created');
    },
  },
};
</script>
