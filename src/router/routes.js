import LoginScreen from '@/screens/LoginScreen'
import ConsoleScreen from '@/screens/ConsoleScreen'
import NewGalleryScreen from '@/screens/NewGalleryScreen'
import GalleryEnrollScreen from '@/screens/GalleryEnrollScreen'
import GalleryScreen from '@/screens/GalleryScreen'
import GalleryViewScreen from '@/screens/GalleryViewScreen'
import RecognizeScreen from '@/screens/RecognizeScreen'
import DetectScreen from '@/screens/DetectScreen'
import GallerySettingsScreen from '@/screens/GallerySettingsScreen'
import GalleryListScreen from '@/screens/GalleryListScreen'
import GallerySubjectScreen from '@/screens/GallerySubjectScreen'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginScreen,
    meta: {
      title: 'Kairos console'
    }
  },
  {
    path: '/',
    name: 'console',
    component: ConsoleScreen,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'new',
        name: 'new',
        component: NewGalleryScreen,
        meta: {
          title: 'New gallery'
        }
      },
      {
        path: 'gallery/:galleryName',
        component: GalleryScreen,
        children: [
          {
            path: '',
            component: GalleryViewScreen,
            meta: {
              title: 'Gallery list'
            },
            children: [
              {
                path: '',
                name: 'gallery',
                component: GalleryListScreen,
              },
              {
                path: 'subject/:subjectId',
                name: 'subject',
                component: GallerySubjectScreen,
              },
            ]
          },
          {
            path: 'recognize',
            name: 'recognize',
            component: RecognizeScreen,
            meta: {
              title: 'Recognize'
            }
          },
          {
            path: 'settings',
            name: 'settings',
            component: GallerySettingsScreen,
            meta: {
              title: 'Settings'
            }
          },
          {
            path: 'enroll',
            name: 'enroll',
            component: GalleryEnrollScreen,
            meta: {
              title: 'Enroll'
            }
          },
          {
            path: 'detect',
            name: 'detect',
            component: DetectScreen,
            meta: {
              title: 'Detect'
            }
          },
        ]
      },
      {
        path: 'enroll',
        name: 'new-enroll',
        component: GalleryEnrollScreen,
        meta: {
          title: 'Enroll'
        }
      },
      {
        path: 'detect',
        name: 'new-detect',
        component: DetectScreen,
        meta: {
          title: 'Detect'
        }
      }
    ]
  }
]

export default routes
