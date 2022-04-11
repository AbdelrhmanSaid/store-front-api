import { Order } from '../../models/Order'
const OrderModel = new Order()

describe('Testing Order Model', () => {
  it('findByUserId method to be defined', () => {
    expect(OrderModel.findByUserId).toBeDefined()
  })

  it('store method to be defined', () => {
    expect(OrderModel.store).toBeDefined()
  })

  it('Store new order', async () => {
    const order = await OrderModel.store({
      user_id: 1,
      order_products: [
        {
          product_id: 1,
          quantity: 1,
        },
      ],
    })

    expect(order).toBeTruthy()
  })

  it('Get specific order by user_id', async () => {
    const order = await OrderModel.findByUserId(1)
    expect(order.length).toBeGreaterThan(0)
  })
})
