<template>
  <div class="GallerySelector">
    <select class="form-control custom-select" :class="{'is-invalid': isInvalid}" v-for="galleryName in galleries" v-model="selectedGallery" @input="selectGallery($event.target.value)" v-if="galleries.length">
      <option value="" disabled>Select gallery</option>
      <option :value="galleryName">{{ galleryName }}</option>
      <option disabled>---</option>
      <option :value="newGalleryOption">New gallery</option>
    </select>

    <input type="text" class="form-control mt-2" :class="{'is-invalid': isInvalid}" :value="value" placeholder="Enter name of new gallery" @input="$emit('input', $event.target.value)" v-if="isCustomNameInputVisible || !galleries.length" ref="input" />
  </div>
</template>

<script>
  export default {
    components: {},

    props: {
      value: true,

      isInvalid: {
        type: Boolean,
        default: false
      },

      galleries: {
        type: Array,
        default: []
      }
    },

    data() {
      return {
        isCustomNameInputVisible: false,
        newGalleryOption: '$$NEW$$',
        selectedGallery: ''
      }
    },

    computed: {},

    methods: {
      selectGallery(galleryName) {
        if (galleryName === this.newGalleryOption) {
          this.isCustomNameInputVisible = true
          this.$emit('input', '')

          this.$nextTick(() => {
            this.$refs.input.focus()
          })
        } else {
          this.isCustomNameInputVisible = false
          this.$emit('input', galleryName)
        }
      }
    },

    watch: {
      value() {
        if (this.galleries.length && this.galleries.includes(this.value)) {
          this.selectedGallery = this.value
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
