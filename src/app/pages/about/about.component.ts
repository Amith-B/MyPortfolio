import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { PortfolioinfoService } from './../../services/portfolioinfo.service';
import { dataInterface } from './../../services/portfolioinfo.service';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit, OnDestroy {

  dob:Date;
  age:Number;
  data: dataInterface;
  
  dark:boolean=true;
  themeClass:string='bar-dark';


  profileSubscription:Subscription;
  themeSubscription:Subscription;

  constructor(
    private portfolioinfoService:PortfolioinfoService,
    private pageHeading: PageheadingService,
    private themeService: ThemeService) { }
  
  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.pageHeading.pageHeading.next("About Me");

    this.profileSubscription = this.portfolioinfoService.profileDataChangeEvent.subscribe((data)=>{
      this.data=data;
      this.dob=new Date(this.data.info.dob);
      this.age=this.calculate_age(this.dob);
    })

    this.dark=this.themeService.getTheme();
    this.themeClass = this.dark?"bar-dark":"bar-light";

    this.themeSubscription=this.themeService.darkThemeEvent
        .subscribe((dark:boolean)=>{
          this.dark=dark;
          this.themeClass = dark?"bar-dark":"bar-light";
        });

    this.data=<dataInterface>this.portfolioinfoService.getProfileInfo();
    this.dob=new Date(this.data.info.dob);
    this.age=this.calculate_age(this.dob);
  }

  calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

}
