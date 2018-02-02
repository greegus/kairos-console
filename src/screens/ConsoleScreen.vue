<template>
  <div class="ConsoleScreen">
    <div class="d-flex justify-content-center p-5" v-if="isLoadingGalleries" key="loading">
      <LoadingIcon :large="true" />
    </div>

    <router-view v-show="! isLoadingGalleries" />
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  import LoadingIcon from '@/components/LoadingIcon'
  import ImagePicker from '@/components/ImagePicker'

  export default {
    components: {
      LoadingIcon,
      ImagePicker,
    },

    props: {},

    data() {
      return {
        image: null,
        galleries: null
      }
    },

    computed: {
      ...mapState('console', [
        'isLoadingGalleries',
      ])
    },

    methods: {
      ...mapActions('console', [
        'loadGalleries',
      ]),

      selectFirstOrCreateNew() {
        if (this.galleries.length) {
          this.$router.replace({name: 'gallery', params: {galleryName: this.galleries[0]}})
        } else {
          this.$router.replace({name: 'new'})
        }
      }
    },

    async created() {
      this.galleries = await this.loadGalleries()
      this.selectFirstOrCreateNew()
    },

    watch: {
      '$route' (to, from) {
        if (to.path === '/') {
          this.selectFirstOrCreateNew()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
