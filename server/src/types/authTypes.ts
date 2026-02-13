import { type Request } from "express"

export interface User {
    id: number
    email: string
    password: string
}

export interface SafeUser {
    id: number
    email: string   
}

export interface AuthRequest extends Request {
  user?: any;
}