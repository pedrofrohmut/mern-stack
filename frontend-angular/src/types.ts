export type NewGoal = {
    text: string
    userId: string
}

export type Goal = {
    id: string
    text: string
    userId: string
}

export type ResponseGoal = {
    _id: string
    text: string
    userId: string
    createdAt: string
    updatedAt: string
    __v: number
}

export type SessionUser = {
    id: string
    name: string
    email: string
    token: string
}

export type NewUser = {
    name: string
    email: string
    phone: string
    password: string
}

export type SignInUser = {
    email: string
    password: string
}
