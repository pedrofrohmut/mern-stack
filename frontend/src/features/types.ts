export type SessionUser = {
  id: string
  name: string
  email: string
  token: string
}

export type User = {
  id?: string
  name?: string
  email?: string
  phone?: string
  password?: string
  token?: string
}

export type UserCredentials = {
  email: string
  password: string
}

export type AuthState = {
  user?: User | null
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  message?: string
}
