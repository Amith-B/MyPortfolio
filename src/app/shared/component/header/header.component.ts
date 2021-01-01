import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideBarEventTrigger:EventEmitter<any>=new EventEmitter();

  //@Output() darkModeTrigger:EventEmitter<boolean>=new EventEmitter();

  toolbarHeading="Home";
  dark=true;

  constructor(
    private pageHeadingService:PageheadingService,
    private themeService: ThemeService) { }

  ngOnInit(): void {
    this.pageHeadingService.pageHeading.subscribe((heading)=>{
      this.toolbarHeading=heading;
      console.log(heading);
    })
  }

  ngOnDestroy(): void {
    this.pageHeadingService.pageHeading.unsubscribe();
  }

  sideBarEvent(event){
    this.sideBarEventTrigger.emit();
  }

  handleChange(){
    this.dark=!this.dark;
    this.themeService.setDarkTheme(this.dark);
    //this.darkModeTrigger.emit(this.dark);
  }

}
