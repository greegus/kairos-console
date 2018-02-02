<template>
  <div class="Modal" @click="close()" @keydown.esc.stop="close()" tabindex="0" ref="modal">
    <div class="Modal__dialog" @click.stop>
      <div class="Modal__closer" @click="close()">
        &times;
      </div>

      <div class="Modal__header" v-if="$slots.title">
        <div class="Modal__title h4">
          <slot name="title"></slot>
        </div>
      </div>


      <div class="Modal__content" v-if="$slots.content">
        <slot name="content"></slot>
      </div>

      <slot></slot>

      <div class="Modal__footer" v-if="$slots.buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/variables";

  .Modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $zindex-modal;
    overflow: auto;

    width: 100vw;
    height: 100vh;
    min-height: min-content;
    padding: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
      outline: none;
    }
  }

  .Modal__dialog {
    position: relative;
    overflow: auto;

    display: flex;
    flex-flow: column;
    min-width: 480px;
    max-height: 100%;

    background: white;
    border-radius: 2px;

    pointer-events: all;
  }

  .Modal__header {
    flex: 0 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid $gray-300;
  }

  .Modal__title {
    margin-bottom: 0rem;
  }

  .Modal__closer {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    width: 32px;
    height: 32px;
    margin: 1.5rem;

    font-size: 28px;
    line-height: 30px;
    text-align: center;
    opacity: .5;
    color: $gray-500;

    &:hover {
      cursor: pointer;
      opacity: .75;
    }
  }

  .Modal__content {
    flex: 1 1 auto;

    overflow: auto;

    min-height: 100px;
    padding: 1.5rem 2rem;
  }

  .Modal__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: 1.5rem 2rem;
    border-top: 1px solid $gray-300;
  }
</style>

<script>
  export default {
    methods: {
      close(result) {
        this.$emit('close', result)
      },
    },

    mounted() {
      setTimeout(() => {
        this.$refs.modal.focus()
      })
    }
  }
</script>
