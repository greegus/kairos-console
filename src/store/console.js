import Kairos from '@/services/KairosApi'
import Storage from '@/services/Storage'

const APP_AUTH_STORAGE_KEY = 'appAuth'

const types = {
  LOADING_GALLERIES_LIST_SET: 'LOADING_GALLERIES_LIST_SET',
  LOADING_GALLERY_SET: 'LOADING_GALLERY_SET',
  GALLERIES_LOADED: 'GALLERIES_LOADED',
  GALLERY_LOADED: 'GALLERY_LOADED',
  APP_AUTH_CHANGED: 'APP_AUTH_CHANGED',
}

const state = {
  appAuth: null,
  isLoadingGalleries: false,
  isLoadingGallery: false,
  galleries: [],
  selectedGallery: null
}

const actions = {
  init({dispatch}) {
    const appAuth = Storage.getItem(APP_AUTH_STORAGE_KEY)

    if (appAuth) {
      dispatch('setAppAuth', [appAuth.appId, appAuth.appKey])
    }
  },

  setAppAuth({commit}, [appId, appKey, remember]) {
    const appAuth = {appId, appKey}

    Kairos.setAuth(appId, appKey)

    if (remember) {
      Storage.setItem(APP_AUTH_STORAGE_KEY, appAuth)
    }

    commit(types.APP_AUTH_CHANGED, {appAuth})
  },

  clearAppAuth({commit}) {
    Kairos.clearAuth()
    Storage.removeItem(APP_AUTH_STORAGE_KEY)

    const appAuth = null

    commit(types.APP_AUTH_CHANGED, {appAuth})
  },

  async loadGalleries({commit, dispatch}) {
    commit(types.LOADING_GALLERIES_LIST_SET, true)

    const galleries = await Kairos.listAllGalleries()

    commit(types.GALLERIES_LOADED, {galleries})
    commit(types.LOADING_GALLERIES_LIST_SET, false)

    return galleries
  },

  async selectGallery({commit}, galleryName) {
    commit(types.LOADING_GALLERY_SET, true)

    const gallery = await Kairos.viewGallery(galleryName)

    commit(types.GALLERY_LOADED, {gallery})
    commit(types.LOADING_GALLERY_SET, false)
  }
}

const mutations = {
  [types.LOADING_GALLERIES_LIST_SET] (state, isLoadingGalleries) {
    state.isLoadingGalleries = isLoadingGalleries
  },

  [types.GALLERIES_LOADED] (state, {galleries}) {
    state.galleries = galleries
  },

  [types.LOADING_GALLERY_SET] (state, isLoadingGallery) {
    state.isLoadingGallery = isLoadingGallery
  },

  [types.GALLERY_LOADED] (state, {gallery}) {
    state.selectedGallery = gallery
  },

  [types.APP_AUTH_CHANGED] (state, {appAuth}) {
    state.appAuth = appAuth
  },
}

const getters = {
  isAuth(state) {
    return state.appAuth && state.appAuth.appId && state.appAuth.appKey
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
