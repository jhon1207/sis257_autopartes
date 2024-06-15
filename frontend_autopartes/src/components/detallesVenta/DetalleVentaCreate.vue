<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Venta } from '@/models/venta'
import type { Producto } from '@/models/producto'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const idVenta = ref<number>(0)
const ventas = ref<Venta[]>([])
const idProducto = ref<number>(0)
const productos = ref<Producto[]>([])
const cantidad = ref('')
const precioTotal = ref('')

async function crearDetalleVenta() {
  await http
    .post(ENDPOINT, {
      idVenta: idVenta.value,
      idProducto: idProducto.value,
      cantidad: cantidad.value,
      precioTotal: precioTotal.value
    })
    .then(() => router.push('/detalleVenta'))
}

async function obtenerVentas() {
  ventas.value = await http.get('ventas' + idVenta.value).then((res) => res.data)
}

onMounted(async () => {
  ventas.value = await http.get('ventas').then((res) => res.data)
})

async function obtenerProductos() {
  productos.value = await http.get('productos' + idProducto.value).then((res) => res.data)
}

onMounted(async () => {
  productos.value = await http.get('productos').then((res) => res.data)
})

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/detalleVentas">Detalle Ventas</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Detalle Venta</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearDetalleVenta">
        <div class="form-floating mb-2">
          <select class="form-select" v-model="idVenta" required @change="obtenerVentas">
            <option value="" :disabled="true">Seleccione un elemento</option>
            <option v-for="venta in ventas" :key="venta.id" :value="venta.id">
              {{ venta.totalVentas }}
            </option>
          </select>
          <label for="venta">Ventas</label>
        </div>
        <div class="form-floating mb-2">
          <select class="form-select" v-model="idProducto" required @change="obtenerProductos">
            <option value="" :disabled="true">Seleccione un elemento</option>
            <option v-for="producto in productos" :key="producto.id" :value="producto.id">
              {{ producto.nombre }}
            </option>
          </select>
          <label for="venta">Productos</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            v-model="cantidad"
            placeholder="Cantidad"
            required
          />
          <label for="cantidad">Cantidad</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="number"
            class="form-control"
            v-model="precioTotal"
            placeholder="PrecioTotal"
            required
          />
          <label for="precioTotal">Precio Total</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-save" /> Crear
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
