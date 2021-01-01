import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { messageInterface, PortfolioinfoService } from 'src/app/services/portfolioinfo.service';
import { dataInterface } from 'src/app/services/portfolioinfo.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  data:dataInterface;

  submited=false;
  finished=false;

  themeClass:string='bar-dark';

  profileSubscription:Subscription;
  themeSubscription:Subscription;

  @ViewChild("f",{static:true})
  form:NgForm;

  constructor(
    private portfolioinfoService:PortfolioinfoService, 
    private pageHeading: PageheadingService,
    private themeService: ThemeService,
    private _snackBar: MatSnackBar) { }
  

  ngOnInit(): void {
    this.pageHeading.pageHeading.next("Contact Me");
    this.data=<dataInterface>this.portfolioinfoService.getProfileInfo();
  
    this.profileSubscription = this.portfolioinfoService.profileDataChangeEvent.subscribe((data)=>{
      this.data=data;
    });


    this.themeClass = this.themeService.getTheme()?"bar-dark":"bar-light";

    this.themeSubscription=this.themeService.darkThemeEvent
        .subscribe((dark:boolean)=>{
          this.themeClass = dark?"bar-dark":"bar-light";
        });
  
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  submitForm(){
    if(this.form.valid){
      console.log(this.form.value)
      this.submited=true;
      this.portfolioinfoService.pushMessages(<messageInterface>this.form.value)
        .subscribe((data)=>{
          console.log(data);
          this.finished=true;

          this.openSnackBar(
            "Successfully posted your message to Amith",
            "OK",
            true
          );
          this.form.resetForm();

        },
        (error)=>{
          console.log(error);
          this.finished=true;

          this.openSnackBar("Unable to post your message right now","OK")
        })
      
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
