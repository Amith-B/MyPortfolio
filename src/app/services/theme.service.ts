import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PortfolioinfoService } from 'src/app/services/portfolioinfo.service';
import * as settings from './../../assets/settings.json';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkThemeEvent: Subject<boolean> = new Subject();
  dark: boolean =  (settings as any).default.darkTheme;

  constructor(private portfolioinfoService:PortfolioinfoService) { 
    try {

      let localDark=JSON.parse(localStorage.getItem('dark'));
      
      if(localDark!==null){
        //set as revisited user
        this.dark=localDark;
        this.portfolioinfoService.setAsRevisitedUser();
      }
      else{
        //set this user as unique user
        this.portfolioinfoService.setAsUniqueUser();
        this.setDarkTheme(this.dark);
      }

    } catch (error) {
      console.log('Unable to retrieve data local storage');
    }
  }

  setDarkTheme(dark: boolean) {
    this.dark = dark;
    this.darkThemeEvent.next(dark);
    try {
      localStorage.setItem('dark',JSON.stringify(this.dark));
    } catch (error) {
      console.log('Unable to write to local storage');
    }
  }

  getTheme() {
    return this.dark;
  }
}
