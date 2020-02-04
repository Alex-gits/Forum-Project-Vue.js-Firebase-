import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Home from '@/pages/PageHome'
import PageThreadShow from '@/pages/PageThreadShow'
import ThreadCreate from '@/pages/PageThreadCreate'
import ThreadEdit from '@/pages/PageThreadEdit'
import NotFound from '@/pages/PageNotFound'
import Forum from '@/pages/PageForum'
import Category from '@/pages/PageCategory'
import Profile from '@/pages/PageProfile'
import Register from '@/pages/PageRegistration'
import SignIn from '@/pages/PageSignIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/thread/create/:forumId',
    name: 'ThreadCreate',
    props: true,
    component: ThreadCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/thread/:id',
    name: 'PageThreadShow',
    props: true,
    component: PageThreadShow
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    props: true,
    component: ThreadEdit,
    meta: { requiresAuth: true }
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/logout',
    name: 'SignOut',
    meta: { requiresAuth: true },
    beforeEnter (to, from, next) {
      store.dispatch('signOut')
        .then(() => next({ name: 'Home' }))
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(`navigation to ${to.name} from ${from.name}`)

  store.dispatch('auth/initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.requiresAuth)) {
        if (user) {
          next()
        } else {
          next({ name: 'SignIn', query: { redirectTo: to.path } })
        }
      } else if (to.matched.some(route => route.meta.requiresGuest)) {
        if (!user) {
          next()
        } else {
          next({ name: 'Home' })
        }
      } else {
        next()
      }
    })
})

export default router
