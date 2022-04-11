import { client } from '../db/client'
import { User as UserType } from '../interfaces/User'
import { hashSync } from 'bcrypt'

export class User {
  protected table: string = 'users'

  /**
   * Get all Users.
   *
   * @returns {Promise<UserType[]>}
   */
  public async all(): Promise<UserType[]> {
    try {
      const connection = await client.connect()
      const query = `SELECT * FROM ${this.table}`
      const result = await connection.query(query)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get all users: ${error}`)
    }
  }

  /**
   * Get specific User by id.
   *
   * @param {number} id
   * @returns {Promise<UserType>}
   */
  public async find(id: number): Promise<UserType> {
    try {
      const connection = await client.connect()
      const query = `SELECT * FROM ${this.table} WHERE id = $1`
      const result = await connection.query(query, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot get user#${id}: ${error}`)
    }
  }

  /**
   * Store new user.
   *
   * @param {UserType} user
   * @returns {Promise<UserType>}
   */
  public async store(user: UserType): Promise<UserType> {
    try {
      const { firstName, lastName, password } = user
      const connection = await client.connect()
      const query = `INSERT INTO ${this.table} (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *`
      const result = await connection.query(query, [firstName, lastName, hashSync(password, 10)])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Cannot store this user: ${error}`)
    }
  }
}
