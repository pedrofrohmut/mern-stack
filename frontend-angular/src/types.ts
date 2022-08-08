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
