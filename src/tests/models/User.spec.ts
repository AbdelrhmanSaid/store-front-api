import { hashSync } from 'bcrypt'
import { User } from '../../models/User'
const UserModel = new User()

describe('Testing User Model', () => {
  it('all method to be defined', () => {
    expect(UserModel.all).toBeDefined()
  })

  it('find method to be defined', () => {
    expect(UserModel.find).toBeDefined()
  })

  it('store method to be defined', () => {
    expect(UserModel.store).toBeDefined()
  })

  it('Store new user', async () => {
    const user = await UserModel.store({
      firstName: 'Abdelrhman',
      lastName: 'Said',
      password: hashSync('12345678', 10),
    })

    expect(user).toBeTruthy()
  })

  it('Gets all users', async () => {
    const users = await UserModel.all()
    expect(users.length).toBeGreaterThan(0)
  })

  it('Get specific user by id', async () => {
    const user = await UserModel.find(1)
    expect(user.id).toBe(1)
  })
})
