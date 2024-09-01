import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonForm from '../components/PersonForm.vue'
import PasswordForm from '../components/PasswordForm.vue'
import ReviewForm from '../components/ReviewForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/person',
      name: 'person',
      component: PersonForm
    },
    {
      path: '/config-passoword',
      name: 'config-passoword',
      component: PasswordForm
    },
    {
      path: '/review',
      name: 'review',
      component: ReviewForm
    }
  ]
})

export default router
