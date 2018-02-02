<template>
  <span class="Icon fa" :class="['fa-' + name]"></span>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Icon {
    line-height: 1;
    display: inline-block;
    vertical-align: initial;

    &::before {
      vertical-align: middle;
    }
  }
</style>
