import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from "./app-routing.module"
import { ToastrModule } from "ngx-toastr"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

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
        AddGoalFormComponent,
        AppComponent,
        DashboardComponent,
        FooterComponent,
        GoalListComponent,
        NavbarComponent,
        SigninComponent,
        SignupComponent,
        SpinnerComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
