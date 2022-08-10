import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { AuthService } from "src/app/services/auth.service"
import { SessionUser } from "src/types"

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
    private readonly router: Router
    private readonly toastr: ToastrService
    private readonly authService: AuthService

    user: SessionUser | null = null

    constructor(authService: AuthService, router: Router, toastr: ToastrService) {
        this.authService = authService
        this.router = router
        this.toastr = toastr
    }

    ngOnInit(): void {
        this.authService.userSubject.subscribe((user) => {
            this.user = user
        })
    }

    handleSignOut() {
        this.authService.signOut()
        this.toastr.info("You are now signed out")
        this.router.navigate(["signin"])
        return false
    }
}
