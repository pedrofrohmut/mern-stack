import { Component, OnInit } from "@angular/core"
import type { Goal } from "src/types"

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    public user = { name: "John Doe" }
    public isLoading = true

    public goals: Goal[] = []

    constructor() {}

    ngOnInit(): void {
        setTimeout(() => {
            this.goals = [
                { id: "1", text: "First goal", userId: "123" },
                { id: "2", text: "Second goal", userId: "123" },
                { id: "3", text: "Third goal", userId: "123" }
            ]
            this.isLoading = false
        }, 2000)
    }

    handleAddGoal(text: string) {
        console.log("ADD GOAL", text)
        const newGoal = {
            id: Math.floor(Math.random() * 100000).toString(),
            text,
            userId: "123"
        }
        this.goals.push(newGoal)
    }

    handleRemoveGoal(goalId: string) {
        this.goals = this.goals.filter(goal => goal.id !== goalId)
    }
}
