import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { verify } from "jsonwebtoken"
import userModel from "../models/userModel"

export const protectRoute = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    res.status(401)
    throw new Error("Not Authorized")
  }
  // Get token from the headers
  const token = req.headers.authorization.split(" ")[1]
  if (!token) {
    res.status(401)
    throw new Error("Not authorized. No token provided")
  }
  // Verify token
  if (!process.env.JWT_SECRET) {
    res.status(500)
    throw new Error("No JWT Secret found in the server ENV")
  }
  let decoded: { id: string }
  try {
    decoded = verify(token, process.env.JWT_SECRET) as { id: string }
  } catch (err) {
    res.status(500)
    // @ts-ignore
    throw new Error("Error to decode the token: " + err.message)
  }
  // Get the user from database by token id
  const user = await userModel.findById(decoded.id).select("-passwordHash")
  // Set user in the request
  // @ts-ignore
  req.user = user
  next()
})
