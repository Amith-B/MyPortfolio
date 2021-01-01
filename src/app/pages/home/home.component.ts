import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { dataInterface, PortfolioinfoService } from 'src/app/services/portfolioinfo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profileURL:string;
  profileSubscription:Subscription;

  constructor(
    private pageHeading: PageheadingService,
    private portfolioinfoService: PortfolioinfoService) { }

  ngOnInit(): void {
    this.pageHeading.pageHeading.next("Home");


    let {profileURL}=(<dataInterface>this.portfolioinfoService.getProfileInfo()).info;
    this.profileURL=profileURL;

    this.profileSubscription = this.portfolioinfoService.profileDataChangeEvent.subscribe((data)=>{
      let { profileURL }=data.info;
      this.profileURL=profileURL;
    });

  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  handleImgLoadError(){
    console.log('Img load error');
  }

}
