<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var detalleVentas = ref<DetalleVenta[]>([])

async function getDetalleVentas() {
  detalleVentas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/detalleVentas/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el Detalle?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getDetalleVentas())
  }
}

onMounted(() => {
  getDetalleVentas()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Detalle Ventas</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Detalle Ventas</h2>
      <div class="col-12">
        <RouterLink to="/detalleVentas/crear"
          ><font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo</RouterLink
        >
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Ventas</th>
            <th scope="col">Productos</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio Total</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detalleVenta, index) in detalleVentas.values()" :key="detalleVenta.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ detalleVenta.venta.totalVenta }}</td>
            <td>{{ detalleVenta.producto.nombre }}</td>
            <td>{{ detalleVenta.cantidad }}</td>
            <td>{{ detalleVenta.precioTotal }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(venta.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <button class="btn btn-link" @click="toDelete(venta.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
