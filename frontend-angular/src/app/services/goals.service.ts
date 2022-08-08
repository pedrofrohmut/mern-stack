import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, throwError } from "rxjs"
import { LocalStorageService } from "./local-storage.service"
import type { ResponseGoal } from "src/types"

@Injectable({
    providedIn: "root"
})
export class GoalsService {
    private readonly URL = "http://localhost:5000/api/goals"
    private readonly httpClient: HttpClient
    private readonly localStorageService: LocalStorageService

    constructor(httpClient: HttpClient, localStorageService: LocalStorageService) {
        this.httpClient = httpClient
        this.localStorageService = localStorageService
    }

    private getOptions() {
        const token = this.localStorageService.getLocalStorageUser().token
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
        const userId = this.localStorageService.getLocalStorageUser().id
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
