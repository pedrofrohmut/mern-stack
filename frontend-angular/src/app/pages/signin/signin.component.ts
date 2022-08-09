import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { AuthService } from "src/app/services/auth.service"

@Component({
    selector: "app-signin",
    templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit {
    private readonly authService: AuthService
    private readonly router: Router
    private readonly toastr: ToastrService

    public isLoading = false
    public isSubmitted = false
    public email = ""
    public password = ""

    constructor(authService: AuthService, router: Router, toastr: ToastrService) {
        this.authService = authService
        this.router = router
        this.toastr = toastr
    }

    ngOnInit(): void {
        if (this.authService.user) {
            this.router.navigate(['/'])
        }
    }

    async handleSubmit() {
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
        const credentials = { email: this.email, password: this.password }
        this.authService.signIn(credentials).subscribe({
            next: (user) => {
                localStorage.setItem("user", JSON.stringify(user))
                this.toastr.success("User logged in")
                this.router.navigate(["/"])
                reset()
            },
            error: (err) => {
                this.toastr.error(err)
                reset()
            }
        })
    }
}
