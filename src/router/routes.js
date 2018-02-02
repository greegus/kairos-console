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
    component: LoginScreen
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
      },
      {
        path: 'gallery/:galleryName',
        component: GalleryScreen,
        children: [
          {
            path: '',
            component: GalleryViewScreen,
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
            component: RecognizeScreen
          },
          {
            path: 'settings',
            name: 'settings',
            component: GallerySettingsScreen
          },
          {
            path: 'enroll',
            name: 'enroll',
            component: GalleryEnrollScreen
          },
          {
            path: 'detect',
            name: 'detect',
            component: DetectScreen
          },
        ]
      },
      {
        path: 'enroll',
        name: 'new-enroll',
        component: GalleryEnrollScreen
      },
      {
        path: 'detect',
        name: 'new-detect',
        component: DetectScreen
      },
      // {
      //   path: 'view',
      //   name: 'view',
      //   component: GalleryViewScreen
      // },
      // {
      //   path: 'enroll',
      //   name: 'enroll',
      //   component: EnrollScreen
      // }
    ]
  }
]

export default routes
