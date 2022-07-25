import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { verify } from "jsonwebtoken"
import userModel from "../models/userModel"

const getTokenFromHeaders = (req: Request, res: Response) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    res.status(401)
    throw new Error("Not Authorized")
  }
  // Get token from the headers
  const token = req.headers.authorization!.split(" ")[1]
  if (!token) {
    res.status(401)
    throw new Error("Not authorized. No token provided")
  }
  return token
}

const decodeToken = (res: Response, token: string) => {
  // Verify token
  if (!process.env.JWT_SECRET) {
    res.status(500)
    throw new Error("No JWT Secret found in the server ENV")
  }
  let decoded: { id: string }
  try {
    decoded = verify(token, process.env.JWT_SECRET) as { id: string }
    return decoded
  } catch (err) {
    res.status(500)
    // @ts-ignore
    throw new Error("Error to decode the token: " + err.message)
  }
}

const checkUserFromToken = async (res: Response, userId: string) => {
  const user = await userModel.findById(userId)
  if (!user) {
    res.status(401)
    throw new Error("No user found by token's userId")
  }
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email
  }
}

export const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFromHeaders(req, res)
    const decodedToken = decodeToken(res, token)
    const user = await checkUserFromToken(res, decodedToken.id)
    req.user = user
    next()
  }
)
