import { Request, Response } from "express"
import { compare, genSalt, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"
import asyncHandler from "express-async-handler"

import userModel from "../models/userModel"

// @desc Register a new user
// @route POST api/users
// @access Public
export const addUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone } = req.body
  if (!name || !email || !password || !phone) {
    res.status(400)
    throw new Error("Please add all required fields for user")
  }
  // Checks if an user exists
  const userExists = (await userModel.findOne({ email })) !== null
  if (userExists) {
    res.status(400)
    throw new Error("There is already a user registered with this e-mail address")
  }
  // Hash the request password
  let passwordHash: string
  try {
    const salt = await genSalt(10)
    passwordHash = await hash(password, salt)
  } catch (err) {
    res.status(500)
    throw new Error("Error to generate password hash")
  }
  // Creates a new user
  try {
    const { _id } = await userModel.create({ name, email, passwordHash, phone })
    res.status(201).json({ id: _id, name, email })
  } catch (err) {
    res.status(500)
    throw new Error("Error to create an user")
  }
})

// @desc Sign In a user
// @route POST api/users/signin
// @access Public
export const signInUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all required fields for signin")
  }
  // Find user by e-mail
  const foundUser = await userModel.findOne({ email })
  if (!foundUser) {
    res.status(400)
    throw new Error("User not found with the e-mail provided")
  }
  // Check if password matches
  let passwordMatches: boolean
  try {
    passwordMatches = await compare(password, foundUser.passwordHash)
  } catch (err) {
    res.status(500)
    throw new Error("Error to compare request password and user hash")
  }
  if (!passwordMatches) {
    res.status(400)
    throw new Error("Provided password does not match the user password")
  }
  // Generates a JWT
  if (!process.env.JWT_SECRET) {
    res.status(500)
    throw new Error("No JWT Secret found in the server ENV")
  }
  let token: string
  try {
    token = sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
  } catch (err) {
    res.status(500)
    throw new Error("Error to generate a JSON Web Token for this user")
  }
  res.status(200).json({
    id: foundUser._id,
    name: foundUser.name,
    email,
    token
  })
})

// @desc Get the current user data
// @route GET api/users
// @access Private
export const getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const { _id, name, email } = await userModel.findById(req.user.id)
  res.status(200).json({ id: _id, name, email })
})
