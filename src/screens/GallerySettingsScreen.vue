<template>
  <div class="GallerySettingsScreen p-4">
    <div class="wrapper">
      <h1>
        Settings
      </h1>

      <hr/>

      <h2 class="h4">Remove this gallery</h2>

      <p>Remove this gallery with all stored images</p>

      <button class="btn btn-outline-danger" @click="removeGallery()" :disabled="isRemovingGallery">
        {{ isRemovingGallery ? 'Removing gallery…' : 'Remove gallery' }}
      </button>
    </div>
  </div>
</template>

<script>
  import KairosApi from '@/services/KairosApi'

  export default {
    components: {},

    props: {},

    data() {
      return {
        isRemovingGallery: false
      }
    },

    computed: {
      galleryName() {
        return this.$store.route.params.galleryName
      }
    },

    methods: {
      async removeGallery() {
        if (confirm('Remove this gallery?')) {
          this.isRemovingGallery = true

          try {
            await KairosApi.removeGallery(this.galleryName)
            this.$router.push({name: 'console'})
          } catch (e) {
            this.isRemovingGallery = false
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
