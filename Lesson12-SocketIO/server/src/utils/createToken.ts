import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

export const createToken = (name: string): string => {
    return jwt.sign({name}, JWT_SECRET, {expiresIn: '1h'})
}