import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageheadingService {

  pageHeading: Subject<string>= new Subject();

  constructor() { }
}
