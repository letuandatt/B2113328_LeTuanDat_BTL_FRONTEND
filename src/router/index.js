import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import DocGia_Login from '@/components/DocGia_Login.vue';
import NhanVien_Login from '@/components/NhanVien_Login.vue';

const routes = [
    {
        path: "/",
        name: 'home',
        component: Home,
    },
    {
        path: "/login/docgia",
        name: 'docgia_login',
        component: DocGia_Login,
    },
    {
        path: '/login/nhanvien',
        name: 'nhanvien_login',
        component: NhanVien_Login,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;