import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-underline',
  templateUrl: './underline.component.html',
  styleUrls: ['./underline.component.scss']
})
export class UnderlineComponent implements OnInit {

  @Input() dark:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
