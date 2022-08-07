import { Component, OnInit } from "@angular/core"

@Component({
    selector: "app-signin",
    templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit {
    public isLoading = false
    public isSubmitted = false
    public email = ""
    public password = ""

    constructor() {}

    ngOnInit(): void {}

    handleSubmit() {
        this.isSubmitted = true
        this.isLoading = true

        // request sign in

        this.email = ""
        this.password = ""
        setTimeout(() => {
            // router push '/'

            this.isSubmitted = false
            this.isLoading = false
        }, 2000)
    }
}
