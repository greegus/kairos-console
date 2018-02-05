<template>
  <div class="RecognizeScreen p-4">
    <div class="wrapper">
      <h1>
        Recognize face
      </h1>

      <hr/>

      <form @submit.prevent="submit()" class="form">
        <div class="form-group">
          <label class="form-label">Image to recognize in gallery</label>
          <ImagePicker :value="image" @input="image = $event; submit()"/>
        </div>

      </form>

      <div class="my-4">
        <LoadingIcon v-if="isSubmitting">
          Loading…
        </LoadingIcon>

        <p class="text-danger card border p-3" v-if="error">
          Recognition error: {{ error }}
        </p>

        <RecognitionResults v-if="results"
          :results="results"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Kairos from '@/services/KairosApi'

  import ImagePicker from '@/components/ImagePicker'
  import LoadingIcon from '@/components/LoadingIcon'
  import RecognitionResults from '@/components/RecognitionResults'

  export default {
    components: {
      ImagePicker,
      LoadingIcon,
      RecognitionResults
    },

    props: {},

    data() {
      return {
        isSubmitting: false,
        image: null,
        results: null,
        galleryName: null,
        error: null
      }
    },

    computed: {},

    methods: {
      async submit() {
        this.error = null
        this.isSubmitting = true

        try {
          this.results = await Kairos.recognize(this.galleryName, this.image)
        } catch (error) {
          this.error = error
        }

        this.isSubmitting = false
      },

      clear() {
        this.results = null
      }
    },

    created() {
      this.galleryName = this.$route.params.galleryName
    }
  }
</script>

<style lang="scss" scoped>
</style>
