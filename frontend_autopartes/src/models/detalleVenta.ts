import type { Producto } from './producto'
import type { Venta } from './venta'

export interface Detalleventa {
  id: number
  cantidad: number
  precioTotal: number
  venta: Venta
  producto: Producto
}
