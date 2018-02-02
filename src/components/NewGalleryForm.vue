<template>
  <form @submit.prevent="submit()">
    <div class="form-group">
      <label class="form-label">Gallery name</label>
      <input type="text" v-model="person.galleryName" placeholder="Name of your new galery" class="form-control" :class="{'is-invalid': errors.galleryName}">
    </div>

    <hr/>

    <div class="form-group">
      <label class="form-label">Name of the person</label>
      <input type="text" v-model="person.subjectId" placeholder="Enter full name of the person to enroll" class="form-control" :class="{'is-invalid': errors.subjectId}">
    </div>

    <div class="form-group">
      <label class="form-label">Image</label>
      <ImagePicker :value="person.image" :class="{'is-invalid': errors.image}" @input="person.image = $event"/>
    </div>

    <div class="form-group">
      <button class="btn btn-lg btn-primary px-5" type="submit" :disabled="disabled">
        Create gallery
      </button>
    </div>
  </form>
</template>

<script>
  import ImagePicker from '@/components/ImagePicker'

  import createPerson from '@/utils/createPerson'

  export default {
    name: "new-gallery-form",

    components: {
      ImagePicker
    },

    props: {
      disabled: {
        type: Boolean
      }
    },

    data() {
      return {
        person: createPerson(),
        errors: {}
      }
    },

    methods: {
      validate() {
        const errors = {}

        if (!this.person.subjectId) {
          errors.subjectId = true
        }

        if (!this.person.galleryName) {
          errors.galleryName = true
        }

        if (!this.person.image) {
          errors.image = true
        }

        return {
          errors,
          isValid: Object.keys(errors).length === 0
        }
      },

      submit() {
        if (this.disabled) {
          return;
        }

        const {errors, isValid} = this.validate()

        this.errors = errors

        if (isValid) {
          this.$emit('submit', {...this.person})
        }
      }
    }
  }
</script>

<style scoped>

</style>
