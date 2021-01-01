import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { messageInterface, PortfolioinfoService } from 'src/app/services/portfolioinfo.service';
import { dataInterface } from 'src/app/services/portfolioinfo.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  data:dataInterface;

  submited=false;
  finished=false;

  profileSubscription:Subscription;

  @ViewChild("f",{static:true})
  form:NgForm;

  constructor(
    private portfolioinfoService:PortfolioinfoService, 
    private pageHeading: PageheadingService,
    private _snackBar: MatSnackBar) { }
  

  ngOnInit(): void {
    this.pageHeading.pageHeading.next("Contact Me");
    this.data=<dataInterface>this.portfolioinfoService.getProfileInfo();
  
    this.profileSubscription = this.portfolioinfoService.profileDataChangeEvent.subscribe((data)=>{
      this.data=data;
    });
  
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
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
