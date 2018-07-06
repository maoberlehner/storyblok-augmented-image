<template>
  <div>
    <input type="file" @change="uploadImage">

    <div v-if="model.image">
      <img class="image" :src="model.image.replace('a.storyblok.com', 'img2.storyblok.com/160x90/filters:fill(auto,0)')">
      <input type="text" v-model="model.image">
      <button @click.prevent="removeImage">Remove</button>
    </div>
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
