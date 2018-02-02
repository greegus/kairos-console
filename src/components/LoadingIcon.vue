<template>
  <div class="LoadingIcon" :class="modifiers">
    <div class="LoadingIcon__icon"></div>
    <div class="LoadingIcon__text" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .LoadingIcon {
    display: inline-flex;
    align-items: center;

    vertical-align: middle;
  }

  .LoadingIcon__icon {
    display: inline-block;
    width: 24px;
    height: 24px;

    border: 3px solid rgba(black, .1);
    border-top-color: rgba(black, .5);
    border-radius: 100%;

    vertical-align: middle;

    will-change: transform;
    animation: LoadingIcon__animation .7s infinite linear;

    .LoadingIcon.isSmall & {
      width: 16px;
      height: 16px;

      border-width: 2px;
    }

    .LoadingIcon.isLarge & {
      font-size: 1.1rem;

      width: 42px;
      height: 42px;

      border-width: 4px;
    }

    .LoadingIcon.isWhite & {
      border-color: rgba(white, .3);
      border-top-color: white;
    }
  }

  .LoadingIcon__text {
    margin-left: .5rem;
  }

  @keyframes LoadingIcon__animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<script>
  export default {
    props: [
      'small',
      'large',
      'white'
    ],

    computed: {
      modifiers() {
        return {
          isLarge: this.large !== undefined,
          isSmall: this.small !== undefined,
          isWhite: this.white !== undefined,
        }
      }
    }
  }
</script>
