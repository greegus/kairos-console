<template>
  <div class="RecognizeScreen p-4">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <h1>
            Recognize face
          </h1>

          <hr/>

          <form @submit.prevent="submit()" class="form">
            <div class="form-group">
              <label class="form-label">Image to recognize from gallery</label>
              <ImagePicker :value="image" @input="image = $event; submit()"/>
            </div>

          </form>

          <div class="d-flex my-4">
            <LoadingIcon v-if="isSubmitting">
              Loading…
            </LoadingIcon>

            <p class="text-danger" v-if="error">
              {{ error }}
            </p>

            <a href @click.prevent="clear()" v-if="results">
              Clear results
            </a>
          </div>

          <pre class="small">
            {{ results }}
          </pre>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Kairos from '@/services/KairosApi'

  import ImagePicker from '@/components/ImagePicker'
  import LoadingIcon from '@/components/LoadingIcon'

  export default {
    components: {
      ImagePicker,
      LoadingIcon
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
