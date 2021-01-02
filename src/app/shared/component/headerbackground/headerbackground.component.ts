import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerbackground',
  templateUrl: './headerbackground.component.html',
  styleUrls: ['./headerbackground.component.scss']
})
export class HeaderbackgroundComponent implements OnInit {

  @Input() dark:boolean; 

  constructor() { }

  ngOnInit(): void {
    
  }

}
