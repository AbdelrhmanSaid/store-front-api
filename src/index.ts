import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import ProductsRoutes from './routes/products'
import UsersRoutes from './routes/users'
import OrdersRoutes from './routes/orders'

const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.use('/products', ProductsRoutes)
app.use('/users', UsersRoutes)
app.use('/orders', OrdersRoutes)

app.use((_req: Request, res: Response): void => {
  res.status(404).json({
    code: 404,
    message: 'route not found',
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

export default app
