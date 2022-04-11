import { client } from '../db/client'
import { OrderProduct as OrderProductType } from '../interfaces/OrderProduct'

export class OrderProduct {
  protected table: string = 'order_products'

  /**
   * Get all order products.
   *
   * @param {number} orderId
   * @returns
   */
  public async findByOrderId(orderId: number): Promise<OrderProductType[]> {
    const connection = await client.connect()
    const query = `SELECT * FROM ${this.table} WHERE order_id = $1`
    const result = await connection.query(query, [orderId])
    connection.release()

    return result.rows
  }

  /**
   * Store order products.
   *
   * @param {OrderProductType} orderProduct
   * @returns {Promise<OrderProductType>}
   */
  public async store(orderProduct: OrderProductType): Promise<OrderProductType> {
    const { order_id, product_id, quantity } = orderProduct
    const connection = await client.connect()
    const query = `INSERT INTO ${this.table} (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`
    const result = await connection.query(query, [order_id, product_id, quantity])
    connection.release()

    return result.rows[0]
  }
}
