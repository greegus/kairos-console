<template>
  <div class="GalleryListScreen p-4">
    <div class="wrapper">
      <h1>
        List gallery
      </h1>

      <hr/>

      <div class="" v-if="isLoading" key="loading">
        <LoadingIcon :large="true" />
      </div>

      <div v-else key="loading">
        <table class="table table-hover table-sm">
          <thead>
          <tr>
            <th>Subject</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="subjectId in gallery" class="GalleryScreen__row" :class="{'text-muted': isRemoving[subjectId]}">
            <td>
              <router-link :to="{name: 'subject', params: {galleryName, subjectId}}">
                {{ subjectId }}
              </router-link>
            </td>

            <td class="text-right" :class="{'invisible': isRemoving[subjectId]}">
              <div class="GalleryScreen__options">
                <a href @click.prevent="removeSubject(subjectId)">
                  <Icon name="trash"/>
                </a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import Kairos from '@/services/KairosApi'

  import LoadingIcon from '@/components/LoadingIcon'
  import Icon from '@/components/Icon'

  export default {
    components: {
      LoadingIcon,
      Icon,
    },

    props: {},

    data() {
      return {
        isLoading: false,
        gallery: null,
        isRemoving: {}
      }
    },

    computed: {
      galleryName() {
        return this.$store.state.route.params.galleryName
      }
    },

    methods: {
      async loadGallery() {
        this.isLoading = true
        this.gallery = await Kairos.viewGallery(this.galleryName)
        this.isLoading = false
      },

      async removeSubject(subjectId) {
        if (confirm(`Remove subject ${subjectId} ?`)) {
          this.isRemoving[subjectId] = true
          await Kairos.removeGallerySubject(this.galleryName, subjectId)
          this.gallery = await Kairos.viewGallery(this.galleryName)
        }
      }
    },

    created() {
      this.loadGallery()
    }
  }
</script>

<style lang="scss" scoped>
  .GalleryScreen__options {
    visibility: hidden;

    .GalleryScreen__row:hover & {
      visibility: visible;
    }
  }
</style>
