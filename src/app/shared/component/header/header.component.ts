import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';
import { AdminService } from './../../../services/adminService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideBarEventTrigger:EventEmitter<any>=new EventEmitter();

  toolbarHeading="Home";
  dark=true;
  admin=false;
  pageHeadingSubscription:Subscription;
  adminSubscription:Subscription;

  constructor(
    private pageHeadingService:PageheadingService,
    private themeService: ThemeService,
    private adminService: AdminService,
    private route: Router) { }

  ngOnInit(): void {
    this.dark=this.themeService.getTheme();

    this.pageHeadingSubscription=this.pageHeadingService.pageHeading.subscribe((heading)=>{
      this.toolbarHeading=heading;
      console.log(heading);
    })

    this.adminSubscription=this.adminService.admin.subscribe((data)=>{
      this.admin=data;
    })
  }

  ngOnDestroy(): void {
    this.pageHeadingSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }

  sideBarEvent(event){
    this.sideBarEventTrigger.emit();
  }

  handleChange(){
    this.dark=!this.dark;
    this.themeService.setDarkTheme(this.dark);
  }

  handleAdminChange(event){
    event.source.checked=this.admin;

    if(!this.admin){
      this.route.navigate(["login"]);
    }
    else{
      this.adminService.adminLogout();
    }

  }

}
