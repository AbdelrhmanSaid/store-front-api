import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] ?? ''
    jwt.verify(token, process.env.JWT_SECRET as string)
    next()
  } catch (error) {
    res.status(403).json({ error: 'Forbidden, unauthorized token.' })
  }
}
