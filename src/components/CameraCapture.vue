<template>
  <div class="CameraCapture">
    <canvas class="CameraCapture__canvas" ref="canvas" :width="width" :height="height"></canvas>

    <div class="CameraCapture__content">
      <video class="CameraCapture__video" ref="video">Video stream not available.</video>

      <div class="CameraCapture__buttons">
        <button class="btn btn-lg CameraCapture__button" type="button" @click="capturePhoto()" :disabled="!isStreaming">
          <Icon name="camera" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '@/components/Icon'

  export default {
    components: {
      Icon,
    },

    props: {
      width: {
        type: Number,
        default: 320
      },

      height: {
        type: Number,
        default: 240
      }
    },

    data() {
      return {
        isStreaming: false,
        dataUrl: null
      }
    },

    computed: {},

    methods: {
      async startCamera() {
        const {video} = this.$refs

        this.stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

        video.srcObject = this.stream
        video.play()

        this.isStreaming = true
      },

      stopCamera() {
        if (this.stream) {
          Array.from(this.stream.getTracks())
            .forEach((track) => track.stop())
        }
      },

      capturePhoto() {
        const {canvas, video} = this.$refs
        const context = canvas.getContext('2d')

        context.drawImage(video, 0, 0, this.width, this.height)

        this.dataUrl = canvas.toDataURL('image/png')

        this.$emit('capture', this.dataUrl)
      },
    },

    mounted() {
      this.startCamera()
    },

    destroyed() {
      this.stopCamera()
    }
  }
</script>

<style lang="scss" scoped>
  .CameraCapture {
    position: relative;
    display: flex;
  }

  .CameraCapture__content {
    display: flex;
    background: black;
    width: 100%;
  }

  .CameraCapture__canvas {
    position: fixed;
    right: 100%;
    bottom: 100%;
    opacity: 0;
  }

  .CameraCapture__buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1.5rem;
  }

  .CameraCapture__button {
  }
</style>
