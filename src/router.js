import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('./components/Dashboard.vue')
            },
            {
                path: 'SpeciesList',
                name: 'SpeciesList',
                component: () => import('./components/SpeciesList.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
