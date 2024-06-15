import type { Cliente } from './cliente'

export interface Venta {
  id: number
  fecha: Date
  totalVentas: number
  cliente: Cliente
}
