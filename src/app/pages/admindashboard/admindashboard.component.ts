import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/adminService.service';
import { PageheadingService } from 'src/app/services/pageheading.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit, OnDestroy {

  messageSubscription: Subscription;
  messages={};
  messageId:Array<string>=[];

  constructor(
    private pageHeading: PageheadingService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.pageHeading.pageHeading.next("Admin Dashboard");
  
    this.messageSubscription=this.adminService.getMessages().subscribe((data)=>{
      this.messages=data;
      this.messageId=Object.keys(this.messages).reverse();
    })

  }

  ngOnDestroy(){
    this.messageSubscription.unsubscribe();
  }

}
