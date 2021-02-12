import { Component, OnDestroy, OnInit } from '@angular/core';
import { PortfolioinfoService } from './services/portfolioinfo.service';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { AdminService } from './services/adminService.service';

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

  darkTheme: boolean = true;
  themeClass="dark";

  watcher: Subscription;
  themeSubscription: Subscription;
  profileSubscription: Subscription;
  activeMediaQuery = '';

  constructor(
    private portfolioinfoService:PortfolioinfoService,
    private themeService:ThemeService,
    mediaObserver: MediaObserver,
    private adminService: AdminService){

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
    this.profileSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    
    console.log("getting profile details....")

    this.darkTheme=this.themeService.getTheme();
    this.themeClass = this.darkTheme?"dark":"light";
    this.adminService.autoLogin();

    this.profileSubscription=this.portfolioinfoService.parseProfileInfo()
        .subscribe((data)=>{
          this.portfolioinfoService.setProfileInfo(data);
        },
        (error)=>{
          this.parseLocalProfileInfo()
        });

    this.themeSubscription=this.themeService.darkThemeEvent
        .subscribe((dark:boolean)=>{
          this.darkTheme = dark;
          this.themeClass = this.darkTheme?"dark":"light";
        });

  }
  
  parseLocalProfileInfo(){
    this.profileSubscription=this.portfolioinfoService.parseLocalProfileInfo()
      .subscribe((data)=>{
        this.portfolioinfoService.setProfileInfo(data);
      });
  }

  
  toggleSideBar(){
    this.sidebarToggle=!this.sidebarToggle
  }


}
