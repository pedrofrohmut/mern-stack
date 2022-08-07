import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { SigninComponent } from "./pages/signin/signin.component"
import { SignupComponent } from "./pages/signup/signup.component"

const routes: Routes = [
    { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "signin", component: SigninComponent },
    { path: "signup", component: SignupComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
