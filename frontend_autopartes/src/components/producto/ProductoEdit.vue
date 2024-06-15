<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Categoria } from '@/models/categoria'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const idCategoria = ref('')
const categorias = ref<Categoria[]>([])
const nombre = ref('')
const descripcion = ref('')
const precio = ref('')
const stock = ref('')
const id = router.currentRoute.value.params['id']

async function editarProducto() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      idCategoria: idCategoria.value,
      nombre: nombre.value,
      descripcion: descripcion.value,
      precio: precio.value,
      stock: stock.value
    })
    .then(() => router.push('/productos'))
}

async function obtenerCategorias() {
  categorias.value = await http.get('categorias' + idCategoria.value).then((res) => res.data)
}

onMounted(async () => {
  categorias.value = await http.get('categorias').then((res) => res.data)
})

async function getProducto() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    idCategoria.value = response.data.idCategoria
    nombre.value = response.data.nombre
    descripcion.value = response.data.descripcion
    precio.value = response.data.precio
    stock.value = response.data.stock
  })
}

async function getCategoria() {
  await http.get(`${ENDPOINT}/categorias`).then((response) => {
    categorias.value = response.data.categorias
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getProducto()
  getCategoria()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/productos">Productos</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Producto</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarProducto">
        <div class="form-floating mb-2">
          <select class="form-select" v-model="idCategoria" required @change="obtenerCategorias">
            <option value="" :disabled="true">Seleccione un elemento</option>
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
              {{ categoria.nombre }}
            </option>
          </select>
          <label for="categoria">Categorias</label>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" required />
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            v-model="descripcion"
            placeholder="Descripcion"
            required
          />
          <label for="descripcion">Descripcion</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="number"
            class="form-control"
            v-model="precio"
            placeholder="Precio"
            required
          />
          <label for="precio">Precio</label>
        </div>
        <div class="form-floating mb-2">
          <input type="number" class="form-control" v-model="stock" placeholder="Stock" required />
          <label for="stock">Stock</label>
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
