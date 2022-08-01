export type NewGoal = {
  text: string
  userId: string
}

export type Goal = {
  id: string
  text: string
  userId: string
}

export type User = {
  id: string
  name: string
  email: string
  phone: string
}

export type GoalState = { 
  goals: Partial<Goal>[]
}

export type UserState = { 
  user: Partial<User>
}

export type RootState = {
  goals: GoalState
  user: UserState
}
