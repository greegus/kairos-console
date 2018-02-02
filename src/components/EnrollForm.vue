<template>
  <form class="EnrollForm form" @submit.prevent="submit()">
    <div class="form-group">
      <label class="form-label">Name of the person</label>
      <input type="text" v-model="person.subjectId" placeholder="Enter full name of the person to enroll" class="form-control" :class="{'is-invalid': errors.subjectId}">
    </div>

    <div class="form-group">
      <label class="form-label">Image</label>
      <ImagePicker :value="person.image" :class="{'is-invalid': errors.image}" @input="person.image = $event"/>
    </div>

    <div class="form-group">
      <button class="btn btn-lg btn-primary" type="submit" :disabled="disabled">
        Enroll person
      </button>
    </div>
  </form>
</template>

<script>
  import ImagePicker from '@/components/ImagePicker'
  import GallerySelector from '@/components/GallerySelector'

  import createPerson from '@/utils/createPerson'

  export default {
    components: {
      ImagePicker,
      GallerySelector,
    },

    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        person: createPerson(),
        errors: {},
      }
    },

    computed: {},

    methods: {
      validate() {
        const errors = {}

        if (!this.person.subjectId) {
          errors.subjectId = true
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
    },
  }
</script>

<style lang="scss" scoped>
</style>
