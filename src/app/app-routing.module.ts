import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "portfolio",
    component: PortfolioComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "login",
    component: AdminloginComponent
  },
  {
    path: "dashboard",
    component: AdmindashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
