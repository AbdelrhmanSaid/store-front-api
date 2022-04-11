import express, { Request, Response } from 'express'
import { Product } from '../models/Product'
import { Product as ProductType } from '../interfaces/Product'
import { auth } from '../middlewares/auth'

const router = express.Router()
const product = new Product()

router.get('/', (_req: Request, res: Response): void => {
  product
    .all()
    .then((products: ProductType[]) => res.status(200).json(products))
    .catch((error: Error) => res.status(400).json({ error: error.message }))
})

router.post('/store', auth, (req: Request, res: Response): void => {
  product
    .store(req.body)
    .then((product: ProductType) => res.status(200).json(product))
    .catch((error: Error) => res.status(400).json({ error: error.message }))
})

router.get('/:id', (req: Request, res: Response): void => {
  product
    .find(+req.params.id)
    .then((product: ProductType) => res.status(200).json(product))
    .catch((error: Error) => res.status(400).json({ error: error.message }))
})

export default router
