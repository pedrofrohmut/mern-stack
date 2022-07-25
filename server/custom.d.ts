import { Request, Response } from "express"

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string
      name: string
      email: string
    }
    userId?: string
  }
}
