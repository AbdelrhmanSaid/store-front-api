import { OrderProduct } from './OrderProduct'

export interface Order {
  id?: number
  user_id: number
  order_products: OrderProduct[]
  status?: string
}
