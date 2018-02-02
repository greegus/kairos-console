<template>
  <div class="App">
    <TheSidebar class="App__sidebar" v-if="appAuth" />
    <router-view class="App__content" />

    <TheModalsStack />
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import TheSidebar from '@/components/TheSidebar.vue'
  import TheModalsStack from '@/components/TheModalsStack.vue'

  export default {
    components: {
      TheSidebar,
      TheModalsStack,
    },

    computed: {
      ...mapState('console', [
        'appAuth'
      ])
    }

//    created() {
//      this.$store.dispatch('console/init')
//    }
  }
</script>

<style lang="scss">
  @import 'assets/styles/styles';
</style>

<style lang="scss" scoped>
  .App {
    display: flex;
    min-height: 100vh;
    background: whitesmoke;
    align-items: stretch;
  }

  .App__sidebar {
    flex: 0 0 200px;
  }

  .App__content {
    flex: 1 0 auto;
  }
</style>
