<template>
  <label class="Checkbox custom-control custom-checkbox">
    <input class="custom-control-input" type="checkbox" :checked="value" @change="change" />
    <span class="custom-control-indicator"></span>
    <span class="custom-control-label" v-if="$slots.default">
			<slot></slot>
		</span>
  </label>
</template>

<style lang="scss" scoped>
  .Checkbox {
    display: inline-flex;
    align-items: center;

    &.custom-control {
      margin: 0;
      padding-left: 1rem;
    }

    & + & {
      margin-left: 1rem;
    }

    .custom-control-input {
      &:focus ~ .custom-control-label {
        box-shadow: none !important;
      }
    }

    .custom-control-label {
      margin-left: .5rem;
      user-select: none;
    }
  }
</style>

<script>
  export default {
    components: {},

    props: {
      value: {
        type: Boolean
      }
    },

    methods: {
      change(e) {
        this.$emit('input', e.target.checked);
      }
    },
  }
</script>
