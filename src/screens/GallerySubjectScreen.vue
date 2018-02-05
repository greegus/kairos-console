<template>
  <div class="GallerySubjectScreen p-4">
    <div class="wrapper">
      <h1>Subject details</h1>

      <hr/>

      <div v-if="isLoading" key="loading">
        <LoadingIcon :large="true"/>
      </div>

      <div v-else key="loading">
        <h1 class="h4">
          <router-link :to="{name: 'gallery'}">Gallery</router-link> &rsaquo;
          {{ subjectId }}
        </h1>

        <table class="table table-hover table-sm">
          <thead>
          <tr>
            <th>Face ID</th>
            <th>Timestamp</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="face in subject.face_ids" :key="face.face_id">
            <td>
              {{ face.face_id }}
            </td>

            <td>
              {{ face.enrollment_timestamp }}
            </td>

            <td>
              <a href @click.prevent="removeFace(face.face_id)">
                <Icon name="times"/>
              </a>
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
  import moment from 'moment'

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
        subject: null,
        removingFaces: {}
      }
    },

    computed: {
      galleryName() {
        return this.$store.state.route.params.galleryName
      },

      subjectId() {
        return this.$store.state.route.params.subjectId
      },
    },

    methods: {
      async loadSubject() {
        this.isLoading = true
        this.subject = await Kairos.viewGallerySubject(this.galleryName, this.subjectId)
        this.isLoading = false
      },

      async removeFace(faceId) {
        if (!confirm('Remove this face?')) {
          return
        }

        this.removingFaces[faceId] = true
        await Kairos.removeGallerySubject(this.galleryName, this.subjectId, faceId)

        try {
          await this.loadSubject()
        } catch (e) {
          this.$router.replace({name: 'gallery', params: {galleryName: this.galleryName}})
        }

        delete this.removingFaces[faceId]
      }
    },

    created() {
      this.loadSubject()
    }
  }
</script>

<style lang="scss" scoped>
</style>
