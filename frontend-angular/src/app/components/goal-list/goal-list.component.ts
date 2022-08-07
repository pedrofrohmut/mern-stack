import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import type { Goal } from "src/types"

@Component({
    selector: "app-goal-list",
    templateUrl: "./goal-list.component.html"
})
export class GoalListComponent implements OnInit {
    @Input() goals: Goal[] = []

    @Output() removeGoal = new EventEmitter()

    constructor() {}

    ngOnInit(): void {}

    handleRemoveGoal(goalId: string) {
        this.removeGoal.emit(goalId)
    }
}
