<template>
	<button class="FilePicker" type="button" @click="select()">
    <input class="FilePicker__input" type="file" tabindex="-1" ref="input" :multiple="multiple">
    <slot></slot>
	</button>
</template>

<script>
	export default {
		props: {
		  multiple: {
		    type: Boolean,
        default: false
      }
    },

    methods: {
      select() {
        this.$refs.input.click()
      }
    },

    mounted() {
		  this.$refs.input.addEventListener('change', (e) => {
        let files = Array.from(e.target.files)

        e.target.value = null

        if (!this.multiple) {
          files = files[0]
        }

        this.$emit('select', files)
      })
    }
	}
</script>

<style lang="scss" scoped>
  .FilePicker__input {
    position: fixed;
    rigth: 100%;
    bottom: 100%;
    opacity: 0;
  }
</style>
