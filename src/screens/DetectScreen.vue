<template>
  <div class="DetectScreen p-4">
    <div class="wrapper">
      <form @submit.prevent="submit()" class="form">
        <div class="form-group">
          <label class="form-label">Image for detection</label>
          <ImagePicker :value="image" @input="image = $event; submit()"/>
        </div>

        <pre>
              {{ results }}
            </pre>
      </form>
    </div>
  </div>
</template>

<script>
  import Kairos from '@/services/KairosApi'

  import ImagePicker from '@/components/ImagePicker'

  export default {
    components: {
      ImagePicker
    },

    props: {},

    data() {
      return {
        isSubmitting: false,
        image: null,
        results: null
      }
    },

    computed: {},

    methods: {
      async submit() {
        this.isSubmitting = true
        this.results = await Kairos.detect(this.image)
        this.isSubmitting = false
      }
    },

    created() {
    }
  }
</script>

<style lang="scss" scoped>
</style>
