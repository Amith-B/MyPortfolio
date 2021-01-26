import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { HeaderbackgroundComponent } from '../shared/component/headerbackground/headerbackground.component';
import { UnderlineComponent } from '../shared/component/underline/underline.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
    HeaderbackgroundComponent,
    UnderlineComponent,
    AdminloginComponent,
    AdmindashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    ContactComponent,
    AdminloginComponent,
    AdmindashboardComponent,
  ]
})
export class PagesModule { }
