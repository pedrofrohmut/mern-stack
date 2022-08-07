import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"

@Component({
    selector: "app-add-goal-form",
    templateUrl: "./add-goal-form.component.html"
})
export class AddGoalFormComponent implements OnInit {
    public isSubmitted = false
    public text = ""

    @Output() addGoal = new EventEmitter()

    constructor() {}

    ngOnInit(): void {}

    handleAddGoal() {
        this.addGoal.emit(this.text)
    }
}
