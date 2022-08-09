import { Component, OnInit } from "@angular/core"
import { AuthService } from "./services/auth.service"
import { getUserFromLS } from "./utils/local-storage"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    constructor(private readonly authService: AuthService) {}

    ngOnInit(): void {
        const user = getUserFromLS()
        if (user) {
            this.authService.signInWithToken().subscribe()
        }
    }
}
