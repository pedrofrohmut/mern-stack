import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import axios from "axios"
import { getTokenFromLS, removeUserFromLS } from "../utils/local-storage"

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    private readonly router: Router
    private readonly toastr: ToastrService

    constructor(router: Router, toastr: ToastrService) {
        this.router = router
        this.toastr = toastr
    }

    // Check for token in auth routes
    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
        const token = getTokenFromLS()
        if (!token) {
            removeUserFromLS()
            this.router.navigate(["signin"])
            this.toastr.info("Please Sign In to access this page")
            return false
        }
        const response = await axios.post("http://localhost:5000/api/users/verify", { token })
        const isValidToken = response.data as boolean
        if (!isValidToken) {
            removeUserFromLS()
            this.router.navigate(["signin"])
            this.toastr.info("Invalid token, please sign in to validate your credentials")
            return false
        }
        return true
    }
}
