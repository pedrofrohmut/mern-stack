import { NextFunction, Request, Response } from "express"

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (!res.statusCode) {
    res.status(500)
  }
  res.json({ 
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null 
  })
}
