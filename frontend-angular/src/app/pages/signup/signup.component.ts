import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { AuthService } from "src/app/services/auth.service"

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {
    private readonly authService: AuthService
    private readonly router: Router
    private readonly toastr: ToastrService

    public isLoading = false
    public isSubmitted = false

    // Form
    public name = ""
    public email = ""
    public phone = ""
    public password = ""
    public confirmPassword = ""

    constructor(authService: AuthService, router: Router, toastr: ToastrService) {
        this.authService = authService
        this.router = router
        this.toastr = toastr
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
                this.toastr.success("New user created. Sign in to access your dashboard")
                this.router.navigate(["/signin"])
                reset()
            },
            error: (err) => {
                this.toastr.error(err)
                reset()
            }
        })
    }
}
