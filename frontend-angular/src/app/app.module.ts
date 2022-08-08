import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { SigninComponent } from "./pages/signin/signin.component"
import { SignupComponent } from "./pages/signup/signup.component"
import { NavbarComponent } from "./layout/navbar/navbar.component"
import { FooterComponent } from "./layout/footer/footer.component"
import { SpinnerComponent } from "./components/spinner/spinner.component"
import { AddGoalFormComponent } from "./components/add-goal-form/add-goal-form.component"
import { GoalListComponent } from "./components/goal-list/goal-list.component"

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SigninComponent,
        SignupComponent,
        NavbarComponent,
        FooterComponent,
        SpinnerComponent,
        AddGoalFormComponent,
        GoalListComponent
    ],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
