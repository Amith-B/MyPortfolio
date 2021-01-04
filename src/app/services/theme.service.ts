import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkThemeEvent: Subject<boolean> = new Subject();
  dark: boolean = true;

  constructor() { 
    try {

      let localDark=JSON.parse(localStorage.getItem('dark'));
      if(localDark!==null){
        this.dark=localDark;
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
