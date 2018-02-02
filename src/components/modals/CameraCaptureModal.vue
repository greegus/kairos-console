<template>
	<Modal class="CameraCaptureModal" @close="close()">
      <CameraCapture class="CameraCaptureModal__camera" @capture="close($event)" />
	</Modal>
</template>

<script>
  import Modal from '@/components/Modal'
  import CameraCapture from '@/components/CameraCapture'

	export default {
		components: {
		  Modal,
      CameraCapture,
    },

		props: {},

		data() {
			return {}
		},

		computed: {},

		methods: {
      close(result) {
        this.$emit('close', result)
      }
    },
	}
</script>

<style lang="scss" scoped>
  .CameraCaptureModal__camera {
    flex: 1 1 auto;
    overflow: hidden;
    width: 100%;
  }
</style>
