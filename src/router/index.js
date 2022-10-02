import Vue from "vue";
import Router from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import AlbumsPosts from '../components/AlbumsPosts.vue'
import AlbumPhotos from '../components/Photos.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage 
    },
    {
        path: '/albums-posts/:userId',
        name: 'AlbumsPosts',
        component: AlbumsPosts,
        props: true
    },
    {
        path:'/albums-posts/:userId/albumPhotos/:albumId',
        name: 'AlbumPhotos',
        component: AlbumPhotos
    }
]

const router =  new Router({
    mode: 'history',
    routes
})

export default router