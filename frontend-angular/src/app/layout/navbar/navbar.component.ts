import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { AuthService } from "src/app/services/auth.service"

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
    private readonly router: Router
    private readonly toastr: ToastrService

    readonly authService: AuthService

    constructor(authService: AuthService, router: Router, toastr: ToastrService) {
        this.authService = authService
        this.router = router
        this.toastr = toastr
    }

    ngOnInit(): void {}

    handleSignOut() {
        this.authService.signOut()
        this.toastr.info("You are now signed out")
        this.router.navigate(["signin"])
        return false
    }
}
