<template>
  <div class="Dropdown" ref="dropdown">
    <div class="Dropdown__opener" @click.prevent="toggle(true)">
      <slot name="opener"></slot>
    </div>

    <div class="Dropdown__menu" v-show="isOpen" @click="toggle(false)">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isOpen: false
      }
    },

    methods: {
      toggle(state) {
        this.isOpen = state === undefined ? !this.isOpen : state
      },

      closeByClick(e) {
        if (this.isOpen && !this.$refs.dropdown.contains(e.target)) {
          this.toggle(false)
        }
      }
    },

    created() {
      this.closeByClick = this.closeByClick.bind(this)

      window.addEventListener('mousedown', this.closeByClick)
    },

    destroyed() {
      window.removeEventListener('mousedown', this.closeByClick)
    }
  }
</script>

<style scoped>

</style>
