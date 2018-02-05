<template>
  <div class="GalleryEnrollScreen p-4">
    <div class="wrapper">
      <h1>
        Enroll to gallery
      </h1>

      <hr/>

      <div class="text-danger" v-if="responseError">
        {{ responseError }}
      </div>

      <EnrollForm
        :disabled="isSubmitting"
        @submit="submit($event)"
      />
    </div>
  </div>
</template>

<script>
  import Kairos from '@/services/KairosApi'

  import {mapState, mapActions} from 'vuex'

  import EnrollForm from '@/components/EnrollForm'

  export default {
    components: {
      EnrollForm
    },

    props: {},

    data() {
      return {
        responseError: '',
        isSubmitting: false,
      }
    },

    computed: {
      selectedGallery() {
        return this.$route.params.galleryName
      }
    },

    methods: {
      ...mapActions('console', [
        'loadGalleries'
      ]),

      async submit(person) {
        person.galleryName = this.selectedGallery

        if (this.isSubmitting) {
          return
        }

        this.isSubmitting = true
        this.responseError = null

        try {
          await Kairos.enroll(person.galleryName, person.subjectId, person.image)
          await this.loadGalleries()
          this.$router.replace({name: 'gallery', params: {galleryName: person.galleryName}})
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
