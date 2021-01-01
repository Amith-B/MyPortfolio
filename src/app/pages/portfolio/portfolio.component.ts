import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { portfolioDataInterface, PortfolioinfoService } from 'src/app/services/portfolioinfo.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  themeClass:string='bar-dark';
  themeSubscription:Subscription;


  data:Array<portfolioDataInterface>=[];
  spin:Boolean=true;

  constructor(
    private portfolioinfoService: PortfolioinfoService,
    private pageHeading: PageheadingService,
    private _snackBar: MatSnackBar,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.pageHeading.pageHeading.next("Portfolio");
    this.data=<Array<portfolioDataInterface>>this.portfolioinfoService.getPorfolioData();
    if(this.data.length===0){
      console.log("getting portfolio details....")
      this.portfolioinfoService.parsePorfolioData()
        .subscribe((data)=>{
          this.data=data;
          this.portfolioinfoService.setPorfolioData(data);
          this.spin=false;
        },
        (error)=>{
          this.openSnackBar("Unable to parse portfolio right now","OK");
          this.spin=false;
        })
    }
    else{
      this.spin=false;
    }


    this.themeClass = this.themeService.getTheme()?"bar-dark":"bar-light";

    this.themeSubscription=this.themeService.darkThemeEvent
        .subscribe((dark:boolean)=>{
          this.themeClass = dark?"bar-dark":"bar-light";
        });

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

}
