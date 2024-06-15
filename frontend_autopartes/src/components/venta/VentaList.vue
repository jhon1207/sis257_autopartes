<script setup lang="ts">
import type { Venta } from '@/models/venta'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var ventas = ref<Venta[]>([])

async function getVentas() {
  ventas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/ventas/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar el Producto?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getVentas())
  }
}

onMounted(() => {
  getVentas()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Ventas</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Ventas</h2>
      <div class="col-12">
        <RouterLink to="/ventas/crear"
          ><font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo</RouterLink
        >
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Total Venta</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventas.values()" :key="venta.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ venta.cliente.nombre }}</td>
            <td>{{ venta.fecha }}</td>
            <td>{{ venta.totalVentas }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(venta.id)">
                <font-awesome-icon icon="fa-solid fa-edit" />Editar
              </button>
              <button class="btn btn-link" @click="toDelete(venta.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
