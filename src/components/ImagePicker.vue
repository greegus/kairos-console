<template>
  <dropzone @drop="readFile($event)">
    <div class="ImagePicker form-control">
      <img class="ImagePicker__image" :src="value" v-if="value && !isCapturingImage">

      <div class="ImagePicker__buttons">
        <FilePicker class="btn btn-lg btn-outline-secondary mx-1" @select="readFile($event)">
          <Icon name="upload"/> Upload image
        </FilePicker>

        <button class="btn btn-lg btn-outline-secondary mx-1" type="button" @click="takePhoto()">
          <Icon name="camera"/> Take a photo
        </button>
      </div>
    </div>
  </dropzone>
</template>

<script>
  import readFileAsDataURL from '@/utils/readFileAsDataURL'
  import ModalService from '@/services/ModalService'

  import Icon from '@/components/Icon'
  import FilePicker from '@/components/FilePicker'
  import CameraCaptureModal from '@/components/modals/CameraCaptureModal'

  import dropzone from '@/components/abstract/dropzone'

  export default {
    components: {
      FilePicker,
      Icon,
      dropzone
    },

    props: {
      value: {
        type: String
      }
    },

    data() {
      return {
        isCapturingImage: false
      }
    },

    computed: {},

    methods: {
      async takePhoto() {
        this.onChange(await ModalService.open(CameraCaptureModal))
      },

      async readFile(file) {
        this.onChange(await readFileAsDataURL(file))
      },

      onChange(image) {
        image && this.$emit('input', image)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .ImagePicker {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 60%;

    overflow: hidden;
  }

  .ImagePicker__image,
  .ImagePicker__buttons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .ImagePicker__image {
    object-fit: contain;
    background: black;
  }

  .ImagePicker__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
