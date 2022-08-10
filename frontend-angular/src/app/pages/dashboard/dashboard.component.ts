import { Component, OnInit } from "@angular/core"
import { GoalsService } from "src/app/services/goals.service"
import type { Goal, ResponseGoal } from "src/types"

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    private readonly goalsService: GoalsService

    public user = { name: "John Doe" }
    public isLoading = true

    public goals: Goal[] = []

    constructor(goalsService: GoalsService) {
        this.goalsService = goalsService
    }

    ngOnInit(): void {
        this.goalsService.getAllGoals().subscribe((responseGoals) => {
            setTimeout(() => {
                this.goals = responseGoals.map((g) => ({
                    id: g._id,
                    text: g.text,
                    userId: g.userId
                }))
                this.isLoading = false
            }, 500)
        })
    }

    handleAddGoal(text: string) {
        this.goalsService.addGoal(text).subscribe((response) => {
            const { _id: id, text, userId } = response as ResponseGoal
            this.goals.push({ id, text, userId })
        })
    }

    handleRemoveGoal(goalId: string) {
        this.goalsService.deleteGoal(goalId).subscribe(() => {
            this.goals = this.goals.filter((goal) => goal.id !== goalId)
        })
    }
}
