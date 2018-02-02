<template>
  <div class="LoginScreen py-5">
    <div class="container">
      <div class="row">
        <div class="col-6 mx-auto">
          <div class="card rounded p-4">
            <form @submit.prevent="submit()" class="form">
              <h1 class="h4 text-center mb-4">
                Enter app credentials
              </h1>

              <div class="form-group">
                <label class="form-label">App ID</label>
                <input type="text" name="app_id" class="form-control" v-model="appId" required/>
              </div>

              <div class="form-group">
                <label>App Key</label>
                <input type="password" name="app_key" class="form-control" v-model="appKey" required/>
              </div>

              <div class="form-group">
                <label>
                  <Checkbox v-model="remember">
                    Remember credentials
                  </Checkbox>
                </label>
              </div>

              <div class="mt-4">
                <button class="btn btn-primary btn-block" type="submit">
                  Enter console
                </button>
              </div>
            </form>
          </div>

          <div class="text-center mt-2">
            Get your <a href="https://developer.kairos.com/admin">API keys</a> on <a href="https://kairos.com" target="_blank">kairos.com</a>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Checkbox from '@/components/Checkbox'

  export default {
    components: {
      Checkbox,
    },

    props: {},

    data() {
      return {
        appId: '',
        appKey: '',
        remember: false
      }
    },

    computed: {},

    methods: {
      submit() {
        this.$store.dispatch('console/setAppAuth', [this.appId, this.appKey, this.remember])
        this.$router.push({name: 'console'})
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>
