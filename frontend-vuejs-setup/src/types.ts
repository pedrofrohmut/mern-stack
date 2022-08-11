export type NewGoal = {
    text: string
    userId: string
}

export type Goal = {
    id: string
    text: string
    userId: string
}

export type NewUser = {
    name: string
    email: string
    phone: string
}

export type User = {
    id: string
    name: string
    email: string
}

export type SessionUser = {
    id: string
    name: string
    email: string
    token: string
}

export type UserCredentials = {
    email: string
    password: string
}

export type GoalState = {
    goals: Partial<Goal>[]
}

export type AuthState = {
    user: SessionUser
}

export type RootState = {
    goals: GoalState
    auth: AuthState
}
