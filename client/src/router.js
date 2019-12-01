import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/views/MainPage'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: MainPage
        },
        {
            path: '/about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/prices',
            component: () => import('./views/Prices.vue')
        },
        {
            path: '/feedback',
            component: () => import('./views/Feedback.vue')
        },
        {
            path: '/works',
            component: () => import('./views/Works.vue')
        },
        {
            path: '/login',
            component: () => import('./views/Registration.vue')
        },
        
    ]
})