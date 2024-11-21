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
        path: '/dashboard',
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
    },
    {
        path: '/dashboard/nhaxuatbanview',
        name: 'nhaxuatbanview',
        component: () => import("@/views/NhaXuatBanView.vue"),
    },
    {
        path: '/dashboard/nhaxuatbanview/themnhaxuatban',
        name: 'themnhaxuatban',
        component: () => import("@/views/NhaXuatBan_Add.vue"),
        props: true,
    },
    {
        path: '/dashboard/nhaxuatbanview/hieuchinhnhaxuatban/:id',
        name: 'hieuchinhnhaxuatban',
        component: () => import("@/views/NhaXuatBanEdit.vue"),
        props: true,
    },
    {
        path: '/dashboard/sachview',
        name: 'sachview',
        component: () => import("@/views/SachView.vue"),
    },
    {
        path: '/dashboard/sachview/themsach',
        name: 'themsach',
        component: () => import("@/views/Sach_Add.vue"),
        props: true,
    },
    {
        path: '/dashboard/sachview/hieuchinhsach/:id',
        name: 'hieuchinhsach',
        component: () => import("@/views/SachEdit.vue"),
        props: true,
    },
    {
        path: '/dashboard/docgiaview',
        name: 'docgiaview',
        component: () => import("@/views/DocGiaView.vue"),
    },
    {
        path: '/dashboard/docgiaview/themdocgia',
        name: 'themdocgia',
        component: () => import("@/views/DocGia_Add.vue"),
        props: true,
    },
    {
        path: '/dashboard/docgiaview/hieuchinhdocgia/:id',
        name: 'hieuchinhdocgia',
        component: () => import("@/views/DocGiaEdit.vue"),
        props: true,
    },
    {
        path: '/dashboard/theodoimuonsachview',
        name: 'theodoimuonsachview',
        component: () => import("@/views/TheoDoiMuonSachView.vue"),
    },
    {
        path: '/dashboard/theodoimuonsachview/xeptheodocgia',
        name: 'xeptheodocgia',
        component: () => import("@/views/TheoDoiMuonSachByDocGiaView.vue"),
    },
    {
        path: '/dashboard/theodoimuonsachview/xeptheosach',
        name: 'xeptheosach',
        component: () => import("@/views/TheoDoiMuonSachByBookView.vue"),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import("@/views/DocGia_SignUp.vue"),
    },
    {
        path: '/dashboard_docgia',
        name: 'dashboard_docgia',
        component: () => import("@/views/DocGia/Dashboard.vue"),
    },
    {
        path: '/dashboard_docgia/profile',
        name: 'profile',
        component: () => import("@/views/DocGia/DocGiaView.vue"),
    },
    {
        path: '/dashboard_docgia/muonsach',
        name: 'muonsach',
        component: () => import("@/views/DocGia/MuonSach.vue"),
    },
    {
        path: '/dashboard_docgia/history',
        name: 'history',
        component: () => import("@/views/DocGia/History.vue"),
    },
    {
        path: '/dashboard_docgia/checksachcosan',
        name: 'checksachcosan',
        component: () => import("@/views/TheoDoiMuonSachCheckAvailable.vue"),
    },
    {
        path: '/dashboard/profile',
        name: 'profile_nv',
        component: () => import("@/views/HoSoNhanVien.vue"),
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