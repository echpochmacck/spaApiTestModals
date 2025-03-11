import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import Read from '../views/Read.vue'
import NotFound from '../views/NotFound.vue'
import Denied from '../views/Denied.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next('/profile')
        } else {
          next()

        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next('/profile')
        } else {
          next()

        }
      }

    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          next('/')
        } else {
          next()

        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          next('/')
        } else {
          if (localStorage.getItem('role') == 'admin') {
            next()

          } else {
            next('/denied')
          }

        }
      }
    },
    {
      path: '/denied',
      name: 'denied',
      component: Denied,
    },
    {
      path: '/read/:id',
      name: 'read',
      component: Read,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
    },
    {
      path: '/denied',
      name: 'denied',
      component: Denied,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
