import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import CategoryEdit from '../components/cate/CategoryEdit.vue'
import CategoryList from '../components/cate/CategoryList.vue'

import ItemEdit from '../components/items/ItemEdit.vue'
import ItemList from '../components/items/ItemList.vue'

import HeroEdit from '../components/hero/HeroEdit.vue'
import HeroList from '../components/hero/HeroList.vue'

import ArticleEdit from '../components/article/ArticleEdit.vue'
import ArticleList from '../components/article/ArticleList.vue'

import AdEdit from '../components/ad/AdEdit.vue'
import AdList from '../components/ad/AdList.vue'

import AdminUserEdit from '../components/user/AdminUserEdit.vue'
import AdminUserList from '../components/user/AdminUserList.vue'
Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    {
        path: '/',
        name: 'main',
        component: Main,
        redirect: '/categories/list',
        children: [
            { path: '/categories/edit', component: CategoryEdit },
            { path: '/categories/edit/:id', component: CategoryEdit, props: true },
            { path: '/categories/list', component: CategoryList },

            { path: '/items/edit', component: ItemEdit },
            { path: '/items/edit/:id', component: ItemEdit, props: true },
            { path: '/items/list', component: ItemList },

            { path: '/heroes/edit', component: HeroEdit },
            { path: '/heroes/edit/:id', component: HeroEdit, props: true },
            { path: '/heroes/list', component: HeroList },

            { path: '/articles/edit', component: ArticleEdit },
            { path: '/articles/edit/:id', component: ArticleEdit, props: true },
            { path: '/articles/list', component: ArticleList },

            { path: '/ads/edit', component: AdEdit },
            { path: '/ads/edit/:id', component: AdEdit, props: true },
            { path: '/ads/list', component: AdList },

            { path: '/admin_users/edit', component: AdminUserEdit },
            { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
            { path: '/admin_users/list', component: AdminUserList },

        ]
    },

]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        return next('/login')
    }
    next()
})

export default router