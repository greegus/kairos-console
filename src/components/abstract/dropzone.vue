<script>
  export default {
    components: {},

    abstract: true,

    props: {
      accept: {
        type: Array,
        default: () => ([])
      },

      multiple: {
        type: Boolean,
        default: false
      },

      fullscreen: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        isActive: false,
      }
    },

    methods: {
      getElement() {
        return this.fullscreen ? document.body : this.$el;
      }
    },

    mounted() {
      const element = this.getElement()

      if (!element) {
        return
      }

      const dropzoneStyleClass = 'Dropzone'
      const dropzoneActiveStyleClass = `${dropzoneStyleClass}--is-active`

      element.classList.add(dropzoneStyleClass)

      element.addEventListener('dragenter', (e) => {
        e.preventDefault();
        element.classList.add(dropzoneActiveStyleClass)
      })

      element.addEventListener('dragover', (e) => {
        e.dataTransfer.dropEffect = 'copy';
        e.preventDefault();

        element.classList.add(dropzoneActiveStyleClass)
      })

      element.addEventListener('dragleave', (e) => {
        e.preventDefault();

        element.classList.remove(dropzoneActiveStyleClass)
      })

      element.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let files = Array.from(e.dataTransfer.files);

        if (this.accept && this.accept.length) {
          files = files.filter((file) => {
            return this.accept.includes(file.type);
          });
        }

        element.classList.remove(dropzoneActiveStyleClass)

        if (files.length) {
          if (!this.multiple) {
            files = files[0]
          }

          this.$emit('drop', files);
        }
      })
    },

    render() {
      try {
        return this.$slots.default[0]
      } catch (e) {
        if (this.fullscreen) {
          return null
        } else {
          throw('Dropzone.vue missing child element')
        }
      }
    }
  }
</script>

