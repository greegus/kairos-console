<template>
  <div class="TheSidebar d-flex flex-column">
    <router-link :to="{name: 'console'}" class="TheSidebar__logo">
      <img class="TheSidebar__logo-image" src="//www-cdn.kairos.com/images/kairos-logo-icon-white-rgb2.png" alt="">
    </router-link>

    <hr class="TheSidebar__separator"/>

    <div class="TheSidebar__gallery">
      <div class="TheSidebar__gallery-name">
        {{ galleryName || 'New gallery' }}
      </div>

      <div class="TheSidebar__arrow">
        <Icon name="chevron-down" />
      </div>

      <select class="TheSidebar__gallery-select" :value="galleryName" @input="selectGallery($event.target.value)">
        <option :value="galleryName" v-for="galleryName in galleries">{{ galleryName }}</option>
        <option disabled>──────────</option>
        <option value="">New gallery</option>
      </select>
    </div>

    <hr class="TheSidebar__separator"/>

    <div v-if="galleryName">
      <router-link class="TheSidebar__link" :to="{name: 'gallery'}">
        List subjects
      </router-link>

      <router-link class="TheSidebar__link" :to="{name: 'enroll'}">
        Enroll
      </router-link>

      <router-link class="TheSidebar__link" :to="{name: 'recognize'}">
        Recognize
      </router-link>

      <router-link class="TheSidebar__link" :to="{name: 'settings'}">
        Settings
      </router-link>
    </div>

    <div v-if="appAuth" class="mt-auto mb-2">
      <a href class="TheSidebar__link" @click.prevent="clearAppAuth()">
        Logout
      </a>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import Dropdown from '@/components/Dropdown'
  import Icon from '@/components/Icon'

  export default {
    components: {
      Icon,
      Dropdown,
    },

    props: {},

    data() {
      return {
        isAuthDropdownOpen: false
      }
    },

    computed: {
      ...mapState('console', [
        'galleries',
        'appAuth'
      ]),

      galleryName() {
        return this.$store.state.route.params.galleryName
      }
    },

    methods: {
      toggleAuthDropdown() {
        this.isAuthDropdownOpen = !this.isAuthDropdownOpen
      },

      clearAppAuth() {
        this.$router.push({name: 'login'})
        this.$store.dispatch('console/clearAppAuth')
      },

      closeOnClickWhenOpen() {
        if (this.isAuthDropdownOpen) {
          this.isAuthDropdownOpen = false
        }
      },

      selectGallery(galleryName) {
        if (galleryName) {
          this.$router.push({name: 'gallery', params: {galleryName}})
        } else {
          this.$router.push({name: 'new'})
        }
      }
    },

    created() {
      this.closeOnClickWhenOpen = this.closeOnClickWhenOpen.bind(this)
      window.addEventListener('mousedown', this.closeOnClickWhenOpen)
    },

    destroyed() {
      window.removeEventListener('mousedown', this.closeOnClickWhenOpen)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables';

  .TheSidebar {
    background: $header_bg_color;
  }

  .TheSidebar__logo {
    padding: 1rem 1rem .5rem;
    color: white;
    text-decoration: none;
    position: relative;
  }

  .TheSidebar__logo-image {
    max-width: 90%;
  }

  .TheSidebar__gallery {
    position: relative;

    display: flex;
    align-items: center;
    padding: .5rem 1rem;

    color: white;

    &:hover {
      background: rgba(black, .2);
    }
  }

  .TheSidebar__gallery-name {
    flex: 1 1 auto;
    overflow: hidden;

  }

  .TheSidebar__arrow {
    flex: 0 0 auto;
    font-size: 12px;
    margin-right: .25rem;
  }

  .TheSidebar__gallery-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    appearance: none;
    opacity: 0;
    cursor: pointer;
  }

  .TheSidebar__separator {
    border: none;
    border-bottom: 1px solid rgba(white, .1);
    margin: .5rem 0;
  }

  .TheSidebar__link {
    display: block;
    padding: .5rem 1rem;
    color: $gray-500;

    &:hover {
      background: rgba(black, .2);
      text-decoration: none;
      color: white;
    }

    &.router-link-exact-active {
      color: $primary;
    }
  }
</style>
