import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, throwError } from "rxjs"
import type { ResponseGoal } from "src/types"
import { getTokenFromLS, getUserFromLS } from "../utils/local-storage"

@Injectable({
    providedIn: "root"
})
export class GoalsService {
    private readonly URL = "http://localhost:5000/api/goals"
    private readonly httpClient: HttpClient

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

    getAllGoals() {
        return this.httpClient
            .get<ResponseGoal[]>(this.URL, this.getOptions())
            .pipe(catchError((err) => throwError(() => err.error.message)))
    }

    addGoal(text: string) {
        const userId = getUserFromLS()?.id
        return this.httpClient
            .post<ResponseGoal>(this.URL, { text, userId }, this.getOptions())
            .pipe(catchError((err) => throwError(() => err.error.message)))
    }

    deleteGoal(goalId: string) {
        return this.httpClient
            .delete<void>(`${this.URL}/${goalId}`, this.getOptions())
            .pipe(catchError((err) => throwError(() => err.error.message)))
    }
}
