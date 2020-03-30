import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Main from '../components/Main.vue'
import Article from '../components/Article.vue'
import Hero from '../components/Hero.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'main',
        component: Main,
        children: [
            { path: '/', component: Home },
            { path: '/article/:id', name: "article", component: Article, props: true },
        ]
    },
    { path: "/heroes/:id", name: "hero", component: Hero, props: true }

]

const router = new VueRouter({
    routes
})

export default router