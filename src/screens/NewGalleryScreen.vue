<template>
  <div class="NewGalleryScreen p-4">
    <h1>
      Create new gallery
    </h1>

    <hr/>

    <div class="wrapper">
      <div class="text-danger" v-if="responseError">
        {{ responseError }}
      </div>

      <NewGalleryForm
        :disabled="isSubmitting"
        @submit="submit($event)"
      />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import KairosApi from '@/services/KairosApi'

  import NewGalleryForm from '@/components/NewGalleryForm'

  export default {
    components: {
      NewGalleryForm,
    },

    props: {},

    data() {
      return {
        isSubmitting: false,
        responseError: ''
      }
    },

    computed: {
      ...mapState('console', [
        'galleries'
      ])
    },

    methods: {
      async submit(person) {
        if (this.isSubmitting) {
          return
        }

        this.responseError = null
        this.isSubmitting = true

        try {
          await KairosApi.enroll(person.galleryName, person.subjectId, person.image)
          this.$router.push({name: 'gallery', params: {galleryName: person.galleryName}})
        } catch (e) {
          this.responseError = e
          this.isSubmitting = false
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
