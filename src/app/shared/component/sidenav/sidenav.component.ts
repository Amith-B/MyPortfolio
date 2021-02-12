import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioinfoService, dataInterface, visitCountInterface } from 'src/app/services/portfolioinfo.service';
import * as settings from './../../../../assets/settings.json';
import { AdminService } from './../../../services/adminService.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  data:dataInterface;
  visit:visitCountInterface={
    newvisit:0,
    revisit:0
  };
  newVisitPercentage=0;
  reVisitPercentage=0;
  total=0;

  admin=false;

  adminSubscription:Subscription;
  profileSubscription:Subscription;

  showVisitCard=false;
  showVisitCardSettings:{showVisitCard:boolean}=(settings as any).default;


  constructor(
    private portfolioinfoService:PortfolioinfoService,
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
    this.data=<dataInterface>this.portfolioinfoService.getProfileInfo();
    if(this.showVisitCardSettings.showVisitCard){
      this.portfolioinfoService.visitCount.subscribe((visit:visitCountInterface)=>{
        this.visit=visit;
        this.total=this.visit.newvisit+this.visit.revisit;
        this.newVisitPercentage= (this.visit.newvisit/this.total)*100;
        this.reVisitPercentage= (this.visit.revisit/this.total)*100;
        if(this.total< 3) this.showVisitCard=false;
        else this.showVisitCard=true;
      })
    }

    this.profileSubscription = this.portfolioinfoService.profileDataChangeEvent.subscribe((data)=>{
      this.data=data;
    });


    this.adminSubscription=this.adminService.admin.subscribe((data)=>{
      this.admin=data;
    })

  }

  ngOnDestroy(){
    this.adminSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

}
