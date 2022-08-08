import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { ResponseGoal } from "src/types"

// TODO: Replace it for LocalSotrage with Auth
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDg3N2FjMjhmYWRkNzhkNDQ2OWJlNyIsImlhdCI6MTY1OTk1ODg1NywiZXhwIjoxNjYyNTUwODU3fQ.8emtl0Qbl9mSwyjDLdnWUXHKgVWQNEAj2FfjOu1nDWU"
const userId = "62d877ac28fadd78d4469be7"

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
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    getAllGoals() {
        return this.httpClient.get<ResponseGoal[]>(this.URL, this.getOptions())
    }

    addGoal(text: string) {
        return this.httpClient.post<ResponseGoal>(this.URL, { text, userId }, this.getOptions())
    }

    deleteGoal(goalId: string) {
        return this.httpClient.delete<void>(`${this.URL}/${goalId}`, this.getOptions())
    }
}
