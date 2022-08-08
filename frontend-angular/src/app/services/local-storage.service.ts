import { Injectable } from "@angular/core"

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {
    private readonly LS_USER = "user"

    constructor() {}

    getLocalStorageUser() {
        const userLS = localStorage.getItem(this.LS_USER)
        if (!userLS) {
            return undefined
        }
        const user = JSON.parse(userLS)
        return user
    }
}
