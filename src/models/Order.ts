import { client } from '../db/client'
import { Order as OrderType } from '../interfaces/Order'
import { OrderProduct } from './OrderProduct'

export class Order {
  protected table: string = 'orders'

  /**
   * Get current orders by user id
   *
   * @param {number} userId
   * @return {Promise<OrderType[]>}
   */
  public async findByUserId(userId: number): Promise<OrderType[]> {
    try {
      const connection = await client.connect()
      const query = `SELECT * FROM ${this.table} WHERE user_id = $1 AND status = $2`
      const result = await connection.query(query, [userId, 'active'])
      connection.release()

      const OrderProductModel = new OrderProduct()
      const orders = result.rows
      orders.forEach(async (order) => {
        order['order_products'] = await OrderProductModel.findByOrderId(order.id)
      })

      return orders
    } catch (error) {
      throw new Error(`Cannot get user#${userId} current orders: ${error}`)
    }
  }

  /**
   *
   * @param {OrderType} order
   * @returns {Promise<OrderType>}
   */
  public async store(order: OrderType): Promise<OrderType> {
    try {
      const { user_id, order_products } = order
      const connection = await client.connect()
      const query = `INSERT INTO ${this.table} (user_id, status) VALUES ($1, $2) RETURNING *`
      const result = await connection.query(query, [user_id, 'active'])
      connection.release()

      const newOrder = result.rows[0]
      const OrderProductModel = new OrderProduct()
      newOrder['order_products'] = order_products.map((o) => {
        OrderProductModel.store({ ...o, order_id: newOrder.id })
      })

      return newOrder
    } catch (error) {
      throw new Error(`Cannot store this order: ${error}`)
    }
  }
}
