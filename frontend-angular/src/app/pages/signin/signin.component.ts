import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "src/app/services/auth.service"

@Component({
    selector: "app-signin",
    templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit {
    private readonly authService: AuthService
    private readonly router: Router

    public isLoading = false
    public isSubmitted = false
    public email = ""
    public password = ""

    constructor(authService: AuthService, router: Router) {
        this.authService = authService
        this.router = router
    }

    ngOnInit(): void {}

    handleSubmit() {
        this.isSubmitted = true
        this.isLoading = true
        const reset = () => {
            this.email = ""
            this.password = ""
            setTimeout(() => {
                this.isSubmitted = false
                this.isLoading = false
            }, 2000)
        }
        const credentials = {
            email: this.email,
            password: this.password
        }
        this.authService.signIn(credentials).subscribe({
            next: (user) => {
                // TODO: add toastr to show success
                localStorage.setItem("user", JSON.stringify(user))
                this.router.navigate(["/"])
                reset()
            },
            error: (err) => {
                // TODO: add toastr to show err
                reset()
            }
        })
    }
}
