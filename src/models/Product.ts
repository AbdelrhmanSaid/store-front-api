import { client } from '../db/client'
import { Product as ProductType } from '../interfaces/Product'

export class Product {
  protected table: string = 'products'

  /**
   * Get all Products.
   *
   * @returns {Promise<ProductType[]>}
   */
  public async all(): Promise<ProductType[]> {
    try {
      const connection = await client.connect()
      const query = `SELECT * FROM ${this.table}`
      const result = await connection.query(query)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get all Products: ${error}`)
    }
  }

  /**
   * Get specific Product by id.
   *
   * @param {number} id
   * @returns {Promise<ProductType>}
   */
  public async find(id: number): Promise<ProductType> {
    try {
      const connection = await client.connect()
      const query = `SELECT * FROM ${this.table} WHERE id = $1`
      const result = await connection.query(query, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot get Product#${id}: ${error}`)
    }
  }

  /**
   * Store new product.
   *
   * @param {ProductType} product
   * @returns {Promise<ProductType>}
   */
  public async store(product: ProductType): Promise<ProductType> {
    try {
      const { name, price } = product
      const connection = await client.connect()
      const query = `INSERT INTO ${this.table} (name, price) VALUES ($1, $2) RETURNING *`
      const result = await connection.query(query, [name, price])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot store this product: ${error}`)
    }
  }
}
