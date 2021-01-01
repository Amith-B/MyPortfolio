import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { dataInterface, PortfolioinfoService } from 'src/app/services/portfolioinfo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  facebook:string;
  linkedin:string;
  github:string;
  profileSubscription:Subscription;

  constructor(private portfolioinfoService: PortfolioinfoService) { }
  
  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  ngOnInit(): void {
    let {facebook, linkedin, github}=(<dataInterface>this.portfolioinfoService.getProfileInfo()).info;
    this.facebook=facebook;
    this.linkedin=linkedin;
    this.github=github;

    this.profileSubscription = this.portfolioinfoService.profileDataChangeEvent.subscribe((data)=>{
      let {facebook, linkedin, github}=data.info;
      this.facebook=facebook;
      this.linkedin=linkedin;
      this.github=github;
    });
  }

}
