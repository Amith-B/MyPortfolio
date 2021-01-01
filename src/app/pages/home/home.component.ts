import { Component, OnInit } from '@angular/core';
import { PageheadingService } from 'src/app/services/pageheading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pageHeading: PageheadingService) { }

  ngOnInit(): void {
    this.pageHeading.pageHeading.next("Home");
  }

}
