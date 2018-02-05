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
  }
</script>

<style lang="scss">
  @import 'assets/styles/styles';
</style>

<style lang="scss" scoped>
  .App {
    display: flex;
    height: 100vh;
    background: whitesmoke;
    align-items: stretch;
    overflow: hidden;
  }

  .App__sidebar {
    flex: 0 0 240px;
  }

  .App__content {
    flex: 1 0 auto;
    overflow-y: auto;
  }
</style>
