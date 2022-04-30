import express, { Request, Response } from 'express'
import { auth } from '../middlewares/auth'
import { Order } from '../models/Order'
import { Order as OrderType } from './../interfaces/Order'

const router = express.Router()
const order = new Order()

router.post('/store', auth, (req: Request, res: Response): void => {
  order
    .store(req.body)
    .then((order: OrderType) => res.status(200).json(order))
    .catch((error: Error) => res.status(400).json({ error: error.message }))
})

router.get('/:user_id', auth, (req: Request, res: Response): void => {
  order
    .findByUserId(+req.params.user_id)
    .then((order: OrderType[]) => res.status(200).json(order))
    .catch((error: Error) => res.status(400).json({ error: error.message }))
})

export default router
