import supertest from 'supertest'
import app from '../..'
import { generateToken } from '../../utils/generateToken'

const request = supertest(app)

describe('Testing Product endpoints', () => {
  it('GET /products', async () => {
    const response = await request.get('/products')
    expect(response.statusCode).toBe(200)
  })

  it('Invalid Case: GET /products/store', async () => {
    const response = await request.post('/products/store').send()
    expect(response.statusCode).toBe(403)
  })

  it('Valid Case: GET /products/store', async () => {
    const response = await request
      .post('/products/store')
      .set('Authorization', `Bearer ${generateToken({ key: 'secret' })}`)
      .send({
        name: 'Product!',
        price: '55.5',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeTruthy()
  })

  it(`GET /products/1`, async () => {
    const response = await request.get(`/products/1`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(1)
  })
})
