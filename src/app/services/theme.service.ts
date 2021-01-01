import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkThemeEvent:Subject<boolean>=new Subject();
  dark:boolean=true;

  constructor() { }

  setDarkTheme(dark:boolean){
    this.dark=dark;
    this.darkThemeEvent.next(dark);
  }

  getTheme(){
    return this.dark;
  }
}
