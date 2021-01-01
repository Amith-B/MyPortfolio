import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
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
    component: HomeComponent,
    data: {
      pageHeading:"Home"
    }
  },
  {
    path: "about",
    component: AboutComponent,
    data: {
      pageHeading:"About Me"
    }
  },
  {
    path: "portfolio",
    component: PortfolioComponent,
    data: {
      pageHeading:"Portfolio"
    }
  },
  {
    path: "contact",
    component: ContactComponent,
    data: {
      pageHeading:"Contact"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
