import express, { Request, Response } from 'express'
import { auth } from '../middlewares/auth'
import { User } from '../models/User'
import { User as UserType } from '../interfaces/User'
import { generateToken } from '../utils/generateToken'

const router = express.Router()
const user = new User()

router.get('/', auth, (_req: Request, res: Response): void => {
  user
    .all()
    .then((users: UserType[]) => res.status(200).json(users))
    .catch((error: Error) => res.status(400).json({ error: error.message }))
})

router.post('/store', (req: Request, res: Response): void => {
  user
    .store(req.body)
    .then((user: UserType) => res.status(200).json({ ...user, token: generateToken({ id: user.id }) }))
    .catch((error: Error) => res.status(400).json({ error: error.message }))
})

router.get('/:id', auth, (req: Request, res: Response): void => {
  user
    .find(+req.params.id)
    .then((user: UserType) => res.status(200).json(user))
    .catch((error: Error) => res.status(400).json({ error: error.message }))
})

export default router
