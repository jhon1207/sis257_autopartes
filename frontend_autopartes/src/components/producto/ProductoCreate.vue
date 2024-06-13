<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const producto = ref<Producto>({} as Producto)

const idCategoria = ref<number>(0)

const categorias = ref<Categoria[]>([])

async function crearProducto() {
  await http
    .post(ENDPOINT, {
      idCategoria: idCategoria.value,
      nombre: producto.value.nombre,
      descripcion: producto.value.descripcion,
      precio: producto.value.precio,
      stock: producto.value.stock
    })
    .then(() => router.push('/producto'))
}

async function obtenerCategorias() {
  categorias.value = await http.get('categorias' + idCategoria.value).then((res) => res.data)
}

onMounted(async () => {
  categorias.value = await http.get('categorias').then((res) => res.data)
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
          <RouterLink to="/productos">Productos</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nuevo Producto</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearProducto">
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
          <input
            type="text"
            class="form-control"
            v-model="producto.nombre"
            placeholder="Nombre"
            required
          />
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="text"
            class="form-control"
            v-model="producto.descripcion"
            placeholder="Descripcion"
            required
          />
          <label for="descripcion">Descripcion</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="number"
            class="form-control"
            v-model="producto.precio"
            placeholder="Precio"
            required
          />
          <label for="precio">Precio</label>
        </div>
        <div class="form-floating mb-2">
          <input
            type="number"
            class="form-control"
            v-model="producto.stock"
            placeholder="Stock"
            required
          />
          <label for="stock">Stock</label>
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
