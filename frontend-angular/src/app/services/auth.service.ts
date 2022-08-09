import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, throwError, tap } from "rxjs"
import type { NewUser, SignInUser } from "src/types"
import {getTokenFromLS} from "../utils/local-storage"

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private readonly URL = "http://localhost:5000/api/users"
    private readonly httpClient: HttpClient

    user: any = null
    error: any = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    private getOptions() {
        const token = getTokenFromLS()
        if (!token) return
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    signInWithToken() {
        return this.httpClient.get(`${this.URL}/current`, this.getOptions()).pipe(
            tap(user => {
                this.user = user
            }),
            catchError(err => throwError(() => err.message))
        )
    }

    signIn(credentials: SignInUser) {
        return this.httpClient.post(`${this.URL}/signin`, credentials).pipe(
            tap((user) => {
                this.user = user
            }),
            catchError((err) => throwError(() => err.error.message))
        )
    }

    signUp(newUser: NewUser) {
        return this.httpClient
            .post(this.URL, newUser)
            .pipe(catchError((err) => throwError(() => err.error.message)))
    }

    signOut() {
        localStorage.removeItem("user")
        this.user = null
    }
}
