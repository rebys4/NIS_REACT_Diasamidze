export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  username: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse extends User {
  accessToken?: string
  token?: string
}

export interface AuthState {
  token: string | null
  user: User | null
  isSessionChecked: boolean
}
