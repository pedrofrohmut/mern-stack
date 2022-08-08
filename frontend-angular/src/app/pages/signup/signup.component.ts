import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "src/app/services/auth.service"

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {
    private readonly authService: AuthService
    private readonly router: Router

    public isLoading = false
    public isSubmitted = false

    // Form
    public name = ""
    public email = ""
    public phone = ""
    public password = ""
    public confirmPassword = ""

    constructor(authService: AuthService, router: Router) {
        this.authService = authService
        this.router = router
    }

    ngOnInit(): void {}

    handleSubmit() {
        this.isSubmitted = true
        this.isLoading = true
        const reset = () => {
            this.name = ""
            this.email = ""
            this.phone = ""
            this.password = ""
            this.confirmPassword = ""
            setTimeout(() => {
                this.isSubmitted = false
                this.isLoading = false
            }, 2000)
        }
        const { name, email, phone, password } = this
        this.authService.signUp({ name, email, phone, password }).subscribe({
            next: () => {
                // TODO: add toastr to show success
                this.router.navigate(["/signin"])
                reset()
            },
            error: (err) => {
                // TODO: add toastr to show err
                reset()
            }
        })
    }
}
