import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { SigninComponent } from "./pages/signin/signin.component"
import { SignupComponent } from "./pages/signup/signup.component";
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component'

@NgModule({
  declarations: [AppComponent, DashboardComponent, SigninComponent, SignupComponent, NavbarComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
