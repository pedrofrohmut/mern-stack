import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import axios from "axios"
import { getTokenFromLS, getUserFromLS, removeUserFromLS } from "../utils/local-storage"

@Injectable({
    providedIn: "root"
})
export class GuestGuard implements CanActivate {
    private readonly router: Router
    private readonly toastr: ToastrService

    constructor(router: Router, toastr: ToastrService) {
        this.router = router
        this.toastr = toastr
    }

    // Clean up invalid tokens
    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
        const localStorageUser = getUserFromLS()
        if (localStorageUser === null) {
            return true
        }
        const token = getTokenFromLS()
        if (!token) {
            removeUserFromLS()
            return true
        }
        const response = await axios.post("http://localhost:5000/api/users/verify", { token })
        const isValidToken = response.data as boolean
        if (!isValidToken) {
            removeUserFromLS()
            return true
        }
        this.router.navigate(["dashboard"])
        this.toastr.info("You are already signed in. Sign Out if you want to change user")
        return false
    }
}
