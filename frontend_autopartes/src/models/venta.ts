import type { Cliente } from './cliente'

export interface Venta {
  id: number
  fecha: Date
  totalVenta: number
  cliente: Cliente
}
