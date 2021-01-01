import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageheadingService } from 'src/app/services/pageheading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideBarEventTrigger:EventEmitter<any>=new EventEmitter();

  toolbarHeading="Home";

  constructor(private pageHeadingService:PageheadingService) { }

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

}
