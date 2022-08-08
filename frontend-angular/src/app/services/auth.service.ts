import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import type { NewUser, SignInUser } from "src/types"

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private readonly URL = "http://localhost:5000/api/users"
    private readonly httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    signIn(credentials: SignInUser) {
        return this.httpClient
            .post(`${this.URL}/signin`, credentials)
            .pipe(catchError((err) => throwError(() => err.error.message)))
    }

    signUp(newUser: NewUser) {
        return this.httpClient
            .post(this.URL, newUser)
            .pipe(catchError((err) => throwError(() => err.error.message)))
    }

    signOut() {
        localStorage.removeItem("user")
    }
}
