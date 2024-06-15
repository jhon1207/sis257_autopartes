import type { Producto } from './producto'
import type { Venta } from './venta'

export interface DetalleVenta {
  id: number
  cantidad: string
  precioTotal: number
  venta: Venta
  producto: Producto
}
