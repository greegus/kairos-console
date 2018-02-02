import axios from 'axios'

export default class Kairos {
  _apiBaseUrl = 'https://api.kairos.com'

  _config = {}

  constructor(config) {
    this._config = {...this._config, ...config}
  }

  setAuth(appId, appKey) {
    this._config.appId = appId
    this._config.appKey = appKey
  }

  clearAuth() {
    this._config.appId = null
    this._config.appKey = null
  }

  _makeApiCall(method, path, data) {
    return new Promise((resolve, reject) => {
      if (!this._config.appId) {
        console.error('Kairos: appId is not provided')
        return null
      }

      if (!this._config.appKey) {
        console.error('Kairos: appKey is not provided')
        return null
      }

      const url = `${this._apiBaseUrl}/${path}`

      const config = {
        method,
        url,
        data,
        headers: {
          app_id: this._config.appId,
          app_key: this._config.appKey,
        }
      }

      axios(config)
        .then((response) => {
          return response.data
        })

        .then((result) => {
          if (result.Errors) {
            reject(result.Errors[0].Message)
          } else {
            resolve(result)
          }
        })

        .catch((e) => {
          reject('Connection error')
        })
    })
  }

  enroll(galleryName, subjectId, image) {
    return this._makeApiCall('POST', 'enroll', {
      gallery_name: galleryName,
      subject_id: subjectId,
      image: image,
    })
  }

  verify(galleryName, subjectId, image) {
    return this._makeApiCall('POST', 'verify', {
      gallery_name: galleryName,
      subject_id: subjectId,
      image: image,
    })
  }

  recognize(galleryName, image) {
    return this._makeApiCall('POST', 'recognize', {
      gallery_name: galleryName,
      image: image,
    })
  }

  detect(image) {
    return this._makeApiCall('POST', 'detect', {
      image: image,
      selector: 'ROLL'
    })
  }

  listAllGalleries() {
    return this._makeApiCall('POST', 'gallery/list_all')
      .then((data) => data.gallery_ids)
  }

  viewGallery(galleryName) {
    const data = {
      gallery_name: galleryName
    }

    return this._makeApiCall('POST', 'gallery/view', data)
      .then((data) => data.subject_ids)
  }

  viewSubject(galleryName, subjectId) {
    return this._makeApiCall('POST', 'gallery/view_subject', {
      gallery_name: galleryName,
      subject_id: subjectId
    })
  }

  removeGallery(galleryName) {
    return this._makeApiCall('POST', 'gallery/remove', {
      gallery_name: galleryName
    })
  }

  removeGallerySubject(galleryName, subjectId, faceId = null) {
    return this._makeApiCall('POST', 'gallery/remove_subject', {
      gallery_name: galleryName,
      subject_id: subjectId,
      face_id: faceId
    })
  }

  viewGallerySubject(galleryName, subjectId) {
    return this._makeApiCall('POST', 'gallery/view_subject', {
      gallery_name: galleryName,
      subject_id: subjectId
    })
  }
}
