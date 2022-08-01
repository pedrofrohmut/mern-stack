export type Goal = {
  id: string
  text: string
  userId: string
}

export type RootState = {
  goals: Partial<Goal>[]
}
