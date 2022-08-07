import { Component, OnInit } from "@angular/core"

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {
    public isLoading = false
    public isSubmitted = false
    public name = ""
    public email = ""
    public phone = ""
    public password = ""
    public confirmPassword = ""

    constructor() {}

    ngOnInit(): void {}

    handleSubmit() {
        this.isSubmitted = true
        this.isLoading = true

        // request sign up

        this.name = ""
        this.email = ""
        this.phone = ""
        this.password = ""
        this.confirmPassword = ""
        setTimeout(() => {
            // router push '/signin'

            this.isSubmitted = false
            this.isLoading = false
        }, 2000)
    }
}
