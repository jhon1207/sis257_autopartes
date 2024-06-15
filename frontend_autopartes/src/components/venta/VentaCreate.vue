<script setup lang="ts">
//import type { Venta } from '@/models/venta'
import type { Cliente } from '@/models/cliente'
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
//const venta = ref<Venta>({} as Venta)

const idCliente = ref<number>(0)
const clientes = ref<Cliente[]>([])
const fecha = ref('')
const totalVentas = ref('')

async function crearVenta() {
  await http
    .post(ENDPOINT, {
      idCliente: idCliente.value,
      fecha: fecha.value,
      totalVentas: totalVentas.value
    })
    .then(() => router.push('/venta'))
}

async function obtenerClientes() {
  clientes.value = await http.get('clientes' + idCliente.value).then((res) => res.data)
}

onMounted(async () => {
  clientes.value = await http.get('clientes').then((res) => res.data)
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
          <RouterLink to="/ventas">Ventas</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Venta</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearVenta">
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
