import { Product } from '../../models/Product'
const ProductModel = new Product()

describe('Testing Product Model', () => {
  it('all method to be defined', () => {
    expect(ProductModel.all).toBeDefined()
  })

  it('find method to be defined', () => {
    expect(ProductModel.find).toBeDefined()
  })

  it('store method to be defined', () => {
    expect(ProductModel.store).toBeDefined()
  })

  it('Store new product', async () => {
    const product = await ProductModel.store({
      name: 'My Awesome Product!',
      price: 55.5,
    })

    expect(product).toBeTruthy()
  })

  it('Gets all products', async () => {
    const products = await ProductModel.all()
    expect(products.length).toBeGreaterThan(0)
  })

  it('Get specific product by id', async () => {
    const product = await ProductModel.find(1)
    expect(product.id).toBe(1)
  })
})
