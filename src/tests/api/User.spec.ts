import { hashSync } from 'bcrypt'
import supertest from 'supertest'
import app from '../..'
import { generateToken } from '../../utils/generateToken'

const request = supertest(app)

describe('Testing User endpoints', () => {
  it('GET /users/store', async () => {
    const response = await request
      .post('/users/store')
      .set('Authorization', `Bearer ${generateToken({ key: 'secret' })}`)
      .send({
        firstName: 'Abdelrhman',
        lastName: 'Said',
        password: hashSync('12345678', 10),
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeTruthy()
    expect(response.body.token).toBeDefined()
  })

  it('GET /users', async () => {
    const response = await request.get('/users').set('Authorization', `Bearer ${generateToken({ key: 'secret' })}`)
    expect(response.statusCode).toBe(200)
  })

  it(`GET /users/1`, async () => {
    const response = await request.get(`/users/1`).set('Authorization', `Bearer ${generateToken({ key: 'secret' })}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(1)
  })
})
