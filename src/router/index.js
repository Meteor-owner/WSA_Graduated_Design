import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/houseList',
    name: 'houseList',
    component: () => import('../views/HouseView.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/userPage',
    name: 'userPage',
    component: () => import('../views/UserView.vue'),
    children: [
      {
        path: '/attention',
        name: 'attention',
        component: () => import('../views/InfoView.vue')
      }
    ]
  },
  {
    path:'/offer',
    name:'offer',
    component: () => import('../views/UploadView.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
