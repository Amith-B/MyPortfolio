import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageheadingService } from './services/pageheading.service';
import { portfolioDataInterface, PortfolioinfoService } from './services/portfolioinfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  profileInfoLoaded:Boolean=false;

  constructor(private portfolioinfoService:PortfolioinfoService){

  }
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {
    // this.portfolioinfoService.parseProfileInfo().then(()=>{
    //   console.log('Success');
    //   this.profileInfoLoaded=true;
    // }).catch((error)=>{
    //   console.log('Failure');
    //   this.profileInfoLoaded=true;
    // });

    console.log("getting profile details....")
    this.portfolioinfoService.parseProfileInfo()
        .subscribe((data)=>{
          this.portfolioinfoService.setProfileInfo(data);
        })
  }
  title = 'Portfolio';

  sidebarToggle=true;


  
  toggleSideBar(){
    this.sidebarToggle=!this.sidebarToggle
  }

  // setToolbarHeading(name){
  //   this.toolbarHeading=name;
  // }

}
