<template>
  <div class="TheModalsStack">
    <div class="TheModalsStack__backdrop" v-if="modals.length">
    </div>

    <div class="TheModalsStack__modals">
      <component v-for="modal in modals" :key="modal.id" :is="modal.component" :data="modal.data" @close="close(modal, $event)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/variables';

  .TheModalsStack__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $zindex-modal-backdrop;

    width: 100vw;
    height: 100vh;

    background: rgba($modal-backdrop-bg, $modal-backdrop-opacity);
  }
</style>

<script>
  import ModalService from '@/services/ModalService'

  export default {
    data() {
      return {
        modals: [],
      }
    },

    methods: {
      close(modal, result) {
        modal.resolve(result);
        this.remove(modal);
      },

      add(modal) {
        this.modals = [...this.modals, modal]
      },

      remove(modal) {
        this.modals = this.modals.filter((i) => i != modal);
      }
    },

    created() {
      ModalService.$bus.$on('open', (modal) => {
        this.add(modal);
      })
    }
  }
</script>
