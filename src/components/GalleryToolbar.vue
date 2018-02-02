<template>
  <div class="GalleryToolbar">
    <div class="container d-flex align-items-center py-2">
      <select class="custom-select mr-3" :value="galleryName" @input="selectGallery($event.target.value)">
        <option :value="galleryName" v-for="galleryName in galleries">{{ galleryName }}</option>
        <option disabled>──────────</option>
        <option value="">New gallery</option>
      </select>

      <div v-if="galleryName" class="d-inline">
        <router-link class="btn btn-link" :to="{name: 'gallery'}">
          List subjects
        </router-link>

        <router-link class="btn btn-link" :to="{name: 'enroll'}">
          Enroll
        </router-link>

        <router-link class="btn btn-link" :to="{name: 'recognize'}">
          Recognize
        </router-link>

        <router-link class="btn btn-link" :to="{name: 'settings'}">
          Settings
        </router-link>
      </div>

      <div class="ml-auto">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    components: {},

    props: {},

    data() {
      return {}
    },

    computed: {
      ...mapState('console', [
        'galleries'
      ]),

      galleryName() {
        return this.$store.state.route.params.galleryName
      }
    },

    methods: {
      selectGallery(galleryName) {
        if (galleryName) {
          this.$router.push({name: 'gallery', params: {galleryName}})
        } else {
          this.$router.push({name: 'new'})
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/styles';

  .GalleryToolbar {
    background: white;
    border-bottom: 1px solid $gray-200;
  }
</style>
