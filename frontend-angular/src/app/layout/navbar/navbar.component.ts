import { Component, OnInit } from "@angular/core"
import { AuthService } from "src/app/services/auth.service"

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
    private readonly authService: AuthService

    public user = null

    constructor(authService: AuthService) {
        this.authService = authService
    }

    ngOnInit(): void {}

    handleSignOut() {
        this.authService.signOut()
    }
}
