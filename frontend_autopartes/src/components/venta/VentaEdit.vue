<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const idCliente = ref('')
const clientes = ref<Cliente[]>([])
const fecha = ref('')
const totalVentas = ref('')
const id = router.currentRoute.value.params['id']

async function editarVenta() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      idCliente: idCliente.value,
      fecha: fecha.value,
      totalVentas: totalVentas.value
    })
    .then(() => router.push('/ventas'))
}

async function obtenerClientes() {
  clientes.value = await http.get('clientes' + idCliente.value).then((res) => res.data)
}

onMounted(async () => {
  clientes.value = await http.get('clientes').then((res) => res.data)
})

async function getVenta() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    idCliente.value = response.data.idCliente
    fecha.value = response.data.fecha
    totalVentas.value = response.data.totalVentas
  })
}

async function getCliente() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    clientes.value = response.data.clientes
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getVenta()
  getCliente()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/ventas">Ventas</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Venta</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarVenta">
        <div class="form-floating mb-2">
          <select class="form-select" v-model="idCliente" required @change="obtenerClientes">
            <option value="" :disabled="true">Seleccione un elemento</option>
            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
              {{ cliente.nombre }}
            </option>
          </select>
          <label for="cliente">Clientes</label>
        </div>
        <div class="form-floating mb-2">
          <input type="date" class="form-control" v-model="fecha" placeholder="Fecha" required />
          <label for="fecha">Fecha</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="number"
            class="form-control"
            v-model="totalVentas"
            placeholder="TotalVentas"
            required
          />
          <label for="totalVentas">Total Venta</label>
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
