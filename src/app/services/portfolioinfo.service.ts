import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import * as profileInfo from './../../assets/profileInfo.json';
import * as portfolioInfo from './../../assets/portfolioInfo.json';

export interface dataInterface {
  info: {
    dob: string,
    degree:string,
    dept:string,
    city:string,
    phone:string,
    passout:string,
    about_heading:string,
    about_para:string,
    address:{
      line1:string,
      line2:string
    },
    email:string,
    profileURL:string,
    facebook:string,
    linkedin:string,
    github:string,
  },
  eduction:[
    {
      date_range:string,
      heading:string,
      description:string,
      percentage:string
    }
  ],
  experience:[
    {
      date_range:string,
      designation:string,
      company:string,
      description: [
        string
      ],
    }
  ],
  knowledge:[
    {
      name:string,
      percentage: number
    }
  ]
}

export interface portfolioDataInterface {
  imageURL:string,
  cardTitle:string,
  cardSubTitle:string,
  description:string,
  projectURL:string
}

export interface messageInterface {
  name: string;
  mail: string;
  subject: string; 
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioinfoService {
  
  profileDataChangeEvent:EventEmitter<dataInterface>=new EventEmitter();

  firebaseURL="https://amith-portfolio-default-rtdb.firebaseio.com"

  myInfo:dataInterface=profileInfo.default;

  portfolioData: Array<portfolioDataInterface> = portfolioInfo.default;

  constructor(private http:HttpClient) { }

  parseProfileInfo(){
   
    return this.http
            .get<dataInterface>(
                `${this.firebaseURL}/profile.json`,
                {
                    responseType:'json'
                }
            )
  }

  parsePorfolioData(){
    return this.http
            .get<Array<portfolioDataInterface>>(
                `${this.firebaseURL}/portfolio.json`,
                {
                    responseType:'json'
                }
            )

  }

  setPorfolioData(data:Array<portfolioDataInterface>){
    this.portfolioData=data;
  }

  setProfileInfo(data:dataInterface){
    this.myInfo=data;
    this.profileDataChangeEvent.emit(data);
  }

  getPorfolioData(){
    return this.portfolioData;
  }

  getProfileInfo(){
    return this.myInfo
  }

  pushMessages(data:messageInterface){
    return this.http.post(
        `${this.firebaseURL}/messages.json`,
        data
      );
  }

}
