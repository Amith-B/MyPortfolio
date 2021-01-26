import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import * as profileInfo from './../../assets/profileInfo.json';
import * as portfolioInfo from './../../assets/portfolioInfo.json';
import { environment } from './../../environments/environment';

export interface dataInterface {
  info: {
    dob: string;
    degree: string;
    dept: string;
    city: string;
    phone: string;
    passout: string;
    about_heading: string;
    about_para: string;
    address: {
      line1: string;
      line2: string;
    };
    email: string;
    profileURL: string;
    facebook: string;
    linkedin: string;
    github: string;
  };
  eduction: [
    {
      date_range: string;
      heading: string;
      description: string;
      percentage: string;
    }
  ];
  experience: [
    {
      date_range: string;
      designation: string;
      company: string;
      description: [string];
    }
  ];
  knowledge: [
    {
      name: string;
      percentage: number;
    }
  ];
}

export interface portfolioDataInterface {
  imageURL: string;
  cardTitle: string;
  cardSubTitle: string;
  description: string;
  projectURL: string;
}

export interface messageInterface {
  name: string;
  mail: string;
  subject: string;
  message: string;
}

export interface visitCountInterface {
  newvisit: number;
  revisit: number;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioinfoService {
  profileDataChangeEvent: EventEmitter<dataInterface> = new EventEmitter();
  visitCount: EventEmitter<visitCountInterface> = new EventEmitter();

  firebaseURL = environment.firebaseURL;

  myInfo: dataInterface = (profileInfo as any).default;

  portfolioData: Array<portfolioDataInterface> = (portfolioInfo as any).default;

  newvisit = 0;
  revisit = 0;

  constructor(private http: HttpClient) {}

  parseProfileInfo() {
    return this.http.get<dataInterface>(`${this.firebaseURL}/profile.json`, {
      responseType: 'json',
    });
  }

  parsePorfolioData() {
    return this.http.get<Array<portfolioDataInterface>>(
      `${this.firebaseURL}/portfolio.json`,
      {
        responseType: 'json',
      }
    );
  }

  setPorfolioData(data: Array<portfolioDataInterface>) {
    this.portfolioData = data;
  }

  setProfileInfo(data: dataInterface) {
    this.myInfo = data;
    this.profileDataChangeEvent.emit(data);
  }

  getPorfolioData() {
    return this.portfolioData;
  }

  getProfileInfo() {
    return this.myInfo;
  }

  pushMessages(data: messageInterface) {
    return this.http.post(`${this.firebaseURL}/messages.json`, data);
  }

  private fetchCounter(path: string) {
    return this.http.get(`${this.firebaseURL}/${path}.json`);
  }

  private incrementCounter(counter: number, path: string) {
    this.http
      .put(`${this.firebaseURL}/${path}.json`, { counter: counter + 1 })
      .subscribe(
        (data) => {
          console.log('Counter increment successfull');
          this[path] += 1;

          this.getVisit();
        },
        (error) => {
          console.log('Unable to increment counter right now');
          this.getVisit();
        }
      );
  }

  setAsUniqueUser() {
    console.log('New user');
    this.fetchCounter('newvisit').subscribe((data: { counter: number }) => {
      this.newvisit = data.counter;
      this.incrementCounter(this.newvisit, 'newvisit');
    });
  }

  setAsRevisitedUser() {
    console.log('Previously visited user, welcome back');
    this.fetchCounter('revisit').subscribe((data: { counter: number }) => {
      this.revisit = data.counter;
      this.incrementCounter(this.revisit, 'revisit');
    });
  }

  getVisit() {
    this.fetchCounter('newvisit').subscribe((data: { counter: number }) => {
      this.newvisit = data.counter;

      this.fetchCounter('revisit').subscribe((data: { counter: number }) => {
        this.revisit = data.counter;

        this.visitCount.emit({
          newvisit: this.newvisit,
          revisit: this.revisit,
        });
      });
    });
  }
}
