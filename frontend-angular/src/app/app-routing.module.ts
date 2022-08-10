import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { AuthGuard } from "./guards/auth.guard"
import { GuestGuard } from "./guards/guest.guard"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { SigninComponent } from "./pages/signin/signin.component"
import { SignupComponent } from "./pages/signup/signup.component"

const routes: Routes = [
    { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "signin", component: SigninComponent, canActivate: [GuestGuard] },
    { path: "signup", component: SignupComponent, canActivate: [GuestGuard] }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
