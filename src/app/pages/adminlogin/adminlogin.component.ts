import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/adminService.service';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { ThemeService } from 'src/app/services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit, OnDestroy {

  @ViewChild("f",{static:true})
  form:NgForm;

  dark:boolean=true;
  loading=false;

  themeSubscription:Subscription;
  adminSubscription:Subscription;

  constructor(
    private themeService: ThemeService,
    private pageHeading: PageheadingService,
    private adminService: AdminService,
    private route: Router,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.pageHeading.pageHeading.next("Admin Login");

    this.dark=this.themeService.getTheme();

    this.themeSubscription=this.themeService.darkThemeEvent
        .subscribe((dark:boolean)=>{
          this.dark=dark;
        });
  }
  
  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    if(this.adminSubscription)
      this.adminSubscription.unsubscribe();
  }


  submitForm(){
    if(this.form.valid){
      this.loading=true;
      this.adminSubscription=this.adminService.adminLogin(this.form.value.email,this.form.value.password).subscribe(
        (resData)=>{

          this.loading=false;

          this.adminService.admin.next(true);

          this.openSnackBar(
            "Login Successful",
            "OK",
            true
          );

          this.form.resetForm();

          this.route.navigate(["dashboard"]);

        },
        (errorData)=>{

          this.loading=false;

          this.openSnackBar("Wrong Email/Password","OK")
          this.form.resetForm();

        }
      )
  
    }
  }

  openSnackBar(message: string, action: string, success:boolean=false) {
    if(success){
      this._snackBar.open(message, action, {
        duration: 5000,
        panelClass: "notif-success"
      });
    }
    else{
      this._snackBar.open(message, action, {
        duration: 5000
      });
    }
  }

}
