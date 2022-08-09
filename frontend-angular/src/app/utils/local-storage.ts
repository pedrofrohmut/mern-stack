import { SessionUser } from "src/types"

const USER = "user"

export const getTokenFromLS = () => {
    const user = localStorage.getItem(USER)
    if (!user) return null
    try {
        const token = JSON.parse(user).token
        return token
    } catch {
        return null
    }
}

export const getUserFromLS = () => {
    const userLS = localStorage.getItem(USER)
    if (!userLS) {
        return null
    }
    try {
        const user = JSON.parse(userLS)
        return user as SessionUser
    } catch {
        return null
    }
}

export const removeUserFromLS = () => localStorage.removeItem(USER)
