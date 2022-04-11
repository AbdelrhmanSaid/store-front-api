import supertest from 'supertest'
import app from '../..'
import { generateToken } from '../../utils/generateToken'
import { Order } from '../../models/Order'

const request = supertest(app)

beforeAll(() => {
  spyOn(Order.prototype, 'store').and.returnValue(
    Promise.resolve({
      id: 1,
      user_id: 1,
      order_products: [
        {
          id: 1,
          product_id: 1,
          quantity: 1,
        },
      ],
    })
  )

  spyOn(Order.prototype, 'findByUserId').and.returnValue(
    Promise.resolve([
      {
        id: 1,
        user_id: 1,
        order_products: [
          {
            id: 1,
            product_id: 1,
            quantity: 1,
          },
        ],
      },
    ])
  )
})

describe('Testing Order endpoints', () => {
  it('Invalid Case: GET /orders/store', async () => {
    const response = await request.post('/orders/store').send()
    expect(response.statusCode).toBe(403)
  })

  it('Valid Case: GET /orders/store', async () => {
    const response = await request
      .post('/orders/store')
      .set('Authorization', `Bearer ${generateToken({ key: 'secret' })}`)
      .send({
        user_id: 1,
        order_products: [
          {
            product_id: 1,
            quantity: 1,
          },
        ],
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it(`GET /orders/1`, async () => {
    const response = await request.get(`/orders/1`).set('Authorization', `Bearer ${generateToken({ key: 'secret' })}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})
