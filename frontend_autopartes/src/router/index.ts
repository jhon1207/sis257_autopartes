import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores'
import HomeView from '../views/HomeView.vue'
import { getTokenFromLocalStorage } from '@/helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductoView.vue'),
      children: [
        { path: '', component: () => import('../components/producto/ProductoList.vue') },
        { path: 'crear', component: () => import('../components/producto/ProductoCreate.vue') },
        { path: 'editar/:id', component: () => import('../components/producto/ProductoEdit.vue') }
      ]
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/CategoriaView.vue'),
      children: [
        { path: '', component: () => import('../components/categoria/CategoriaList.vue') },
        { path: 'crear', component: () => import('../components/categoria/CategoriaCreate.vue') },
        { path: 'editar/:id', component: () => import('../components/categoria/CategoriaEdit.vue') }
      ]
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue'),
      children: [
        { path: '', component: () => import('../components/cliente/ClienteList.vue') },
        { path: 'crear', component: () => import('../components/cliente/ClienteCreate.vue') },
        { path: 'editar/:id', component: () => import('../components/cliente/ClienteEdit.vue') }
      ]
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: () => import('../views/VentaView.vue'),
      children: [
        { path: '', component: () => import('../components/venta/VentaList.vue') },
        { path: 'crear', component: () => import('../components/venta/VentaCreate.vue') },
        { path: 'editar/:id', component: () => import('../components/venta/VentaEdit.vue') }
      ]
    },
    {
      path: '/detalleVentas',
      name: 'detalleVentas',
      component: () => import('../views/DetalleVentaView.vue'),
      children: [
        { path: '', component: () => import('../components/detallesVenta/DetalleVentaList.vue') },
        {
          path: 'crear',
          component: () => import('../components/detallesVenta/DetalleVentaCreate.vue')
        },
        {
          path: 'editar/:id',
          component: () => import('../components/detallesVenta/DetalleVentaEdit.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach(async (to) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout()
    authStore.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
