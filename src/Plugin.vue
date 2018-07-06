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
    uploadImage(e) {
      const file = e.target.files[0];
      this.api.client.post(`spaces/${this.spaceId}/assets`, { filename: file.name }, { headers: { Authorization: this.options.accessToken } })
        .then(res => {
          let form_data = new FormData()
          let xhr = new XMLHttpRequest()

          for (var key in res.data.fields) {
            form_data.set(key, res.data.fields[key])
          }

          form_data.set('file', file);
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status == 204 || xhr.status == 200 || xhr.status == 201) {
                this.model.image = res.data.pretty_url;
              } else {
                console.log('Error during upload with status: ', xhr.status);
              }
            }
          }
          xhr.open('POST', res.data.post_url)
          xhr.send(form_data)
        });
    },
    removeImage() {},
  },
};
</script>
