import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { portfolioDataInterface, PortfolioinfoService } from 'src/app/services/portfolioinfo.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  data:Array<portfolioDataInterface>=[];
  spin:Boolean=true;

  constructor(
    private portfolioinfoService: PortfolioinfoService,
    private pageHeading: PageheadingService,
    private _snackBar: MatSnackBar
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
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

}
