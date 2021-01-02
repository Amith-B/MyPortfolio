import { Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-underline',
  templateUrl: './underline.component.html',
  styleUrls: ['./underline.component.scss'],
  animations: [
    trigger('bar1Slide',[
      transition(':enter', [
        style({transform: 'translateX(-120px)'}),
        animate('.4s .1s ease-in-out', style({transform: 'translateX(0px)'}))
      ])
    ]),
    trigger('bar2Slide',[
      transition(':enter', [
        style({transform: 'translateX(-100px)'}),
        animate('.2s .3s ease-in-out', style({transform: 'translateX(0px)'}))
      ])
    ])
  ]
})
export class UnderlineComponent implements OnInit {

  @Input() dark:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
