<template>
  <div class="RecognitionResults">
    <div class="nav nav-pills">
      <li class="nav-item">
        <a href class="nav-link" :class="{'active': activeTab == 'formated'}" @click.prevent="selectTab('formated')">
          Formated
        </a>
      </li>
      <li class="nav-item">
        <a href class="nav-link" :class="{'active': activeTab == 'raw'}" @click.prevent="selectTab('raw')">
          Raw (full)
        </a>
      </li>
    </div>

    <hr/>

    <div class="RecognitionResults__tab" v-show="activeTab == 'formated'">
      <div v-if="image.transaction.status == 'success'" key="status">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">
              Recognized subject
            </h5>

            <table class="table table-sm">
              <tbody>
              <tr>
                <th>
                  Subject (face ID)
                </th>

                <td class="text-right">
                  {{ image.transaction.subject_id}}
                  <span class="text-muted">({{ image.transaction.face_id }})</span>
                </td>
              </tr>

              <tr>
                <th>
                  Gallery
                </th>

                <td class="text-right">
                  {{ image.transaction.gallery_name }}
                </td>
              </tr>

              <tr>
                <th>
                  Confidence
                </th>

                <td class="text-right">
                  {{ image.transaction.confidence }}
                </td>
              </tr>

              <tr>
                <th>
                  Quality
                </th>

                <td class="text-right">
                  {{ image.transaction.quality }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              Candidates
            </h5>

            <table class="table table-sm">
              <thead>
              <tr>
                <th>Subject (face ID)</th>
                <th class="text-right">Confidence</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="candidate in image.candidates" :key="candidate.face_id">
                <td>
                  {{ candidate.subject_id }}
                  <span class="text-muted">({{candidate.face_id}})</span>
                </td>

                <td class="text-right">
                  {{ candidate.confidence }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else key="status">
        ahoj
      </div>
    </div>

    <div class="RecognitionResults__tab" v-show="activeTab == 'raw'">
      <pre class="small border rounded p-3">{{ results }}</pre>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      results: {
        required: true,
        type: Object
      }
    },

    data() {
      return {
        activeTab: 'formated'
      }
    },

    computed: {
      image() {
        return this.results && this.results.images[0]
      }
    },

    methods: {
      selectTab(tab) {
        this.activeTab = tab;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
