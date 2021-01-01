import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PortfolioinfoService, dataInterface } from 'src/app/services/portfolioinfo.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  data:dataInterface;

  constructor(private portfolioinfoService:PortfolioinfoService) { }

  ngOnInit(): void {
    this.data=<dataInterface>this.portfolioinfoService.getProfileInfo();
  }

}
