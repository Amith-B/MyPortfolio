import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageheadingService } from './services/pageheading.service';
import { portfolioDataInterface, PortfolioinfoService } from './services/portfolioinfo.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  profileInfoLoaded:Boolean=false;
  title = 'Portfolio';
  sidebarToggle=true;
  mobileDevice=false;

  watcher: Subscription;
  activeMediaQuery = '';

  constructor(
    private portfolioinfoService:PortfolioinfoService,
    mediaObserver: MediaObserver){

    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias == 'xs' || change.mqAlias == 'sm') {
         this.sidebarToggle=false;
         this.mobileDevice=true;
      }
      else {
        this.sidebarToggle=true;
        this.mobileDevice=false;
     }
    });

  }
  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  ngOnInit(): void {
    
    console.log("getting profile details....")
    this.portfolioinfoService.parseProfileInfo()
        .subscribe((data)=>{
          this.portfolioinfoService.setProfileInfo(data);
        })

  }
  
  
  toggleSideBar(){
    this.sidebarToggle=!this.sidebarToggle
  }

}
