import { Component, OnInit } from '@angular/core';
import { PageheadingService } from 'src/app/services/pageheading.service';
import { PortfolioinfoService } from 'src/app/services/portfolioinfo.service';
import { dataInterface } from 'src/app/services/portfolioinfo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  data:dataInterface;

  constructor(private portfolioinfoService:PortfolioinfoService, private pageHeading: PageheadingService) { }

  ngOnInit(): void {
    this.pageHeading.pageHeading.next("Contact Me");
    this.data=<dataInterface>this.portfolioinfoService.getProfileInfo();
  }

}
