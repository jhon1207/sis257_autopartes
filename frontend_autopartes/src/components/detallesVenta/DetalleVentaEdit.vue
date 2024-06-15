<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Venta } from '@/models/venta'
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const idVenta = ref('')
const ventas = ref<Venta[]>([])
const idProducto = ref('')
const productos = ref<Producto[]>([])
const cantidad = ref('')
const precioTotal = ref('')
const id = router.currentRoute.value.params['id']

async function editarDetalleVenta() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      idVenta: idVenta.value,
      idProducto: idProducto.value,
      cantidad: cantidad.value,
      precioTotal: precioTotal.value
    })
    .then(() => router.push('/detalleVentas'))
}

async function obtenerVentas() {
  ventas.value = await http.get('ventas' + idVenta.value).then((res) => res.data)
}

onMounted(async () => {
  ventas.value = await http.get('ventas').then((res) => res.data)
})

async function obtenerProductos() {
  ventas.value = await http.get('productos' + idVenta.value).then((res) => res.data)
}

onMounted(async () => {
  ventas.value = await http.get('productos').then((res) => res.data)
})

async function getDetalleVenta() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    idVenta.value = response.data.idVenta
    idProducto.value = response.data.idProducto
    cantidad.value = response.data.cantidad
    precioTotal.value = response.data.precioTotal
  })
}

async function getVenta() {
  await http.get(`${ENDPOINT}/ventas`).then((response) => {
    ventas.value = response.data.ventas
  })
}

async function getProducto() {
  await http.get(`${ENDPOINT}/productos`).then((response) => {
    productos.value = response.data.productos
  })
}
function goBack() {
  router.go(-1)
}

onMounted(() => {
  getDetalleVenta()
  getVenta()
  getProducto()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/productos">DetalleVentas</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar DetalleVenta</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarDetalleVenta">
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
            <font-awesome-icon icon="fa-solid fa-save" /> Guardar
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
