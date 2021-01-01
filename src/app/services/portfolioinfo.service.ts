import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


export interface dataInterface {
  info: {
    dob: string,
    degree:string,
    dept:string,
    city:string,
    phone:string,
    passout:string,
    about_para:string,
    address:{
      line1:string,
      line2:string
    },
    email:string,
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

  myInfo={};

  portfolioData: Array<portfolioDataInterface> =[];

  constructor(private http:HttpClient) { }

  parseProfileInfo(){
    this.myInfo={
      info: {
        dob: "1997-04-15T18:30:00.000Z",
        degree:"B.E",
        dept:"Computer Science",
        city:"Bangalore",
        phone:"+91 9742753491",
        passout:"2019",
        about_para:`
          Proficient Project Engineer with 1.5 years of experience and knowledge in web
          development and scripting. Interested in learning new technologies.
        `,
        address:{
          line1:"Electronic City Phase 1",
          line2:"Bangalore, India"
        },
        email:"amithbr6@gmail.com",
        facebook:"https://www.facebook.com/people/Amith-B-Sagar/100010365158923",
        linkedin:"https://linkedin.com/in/amith-b-sagar-18162a154/",
        github:"https://github.com/Amith-B",
      },
      eduction:[
        {
          date_range:"2010-2013",
          heading:"High School",
          description:"Pragathi Composite School, Sagar",
          percentage:"91.04%"
        },
        {
          date_range:"2013-2015",
          heading:"Pre-University Course(PUC)",
          description:"Govt. Junior College, Sagar",
          percentage:"81.5%"
        },
        {
          date_range:"2015-2019",
          heading:"Engineering in Computer Science",
          description:"East West Institue Of Technology, Bangalore",
          percentage:"7.69 CGPA"
        }
      ],
      experience:[
        {
          date_range:"2019-Current",
          designation:"Project Engineer",
          company:"Wipro Limited, Bangalore, Karnataka",
          description: [
            "Use REST APIs to automate the tasks using python",
            "Building reusable python scripts which automates the repeated tasks",
            "Developing web page for reports",
            "Building Dashboard Webpages which uses REST APIs to get the metrics",
          ],
        }
      ],
      knowledge:[
        {
          name:"Angular",
          percentage: 90
        },
        {
          name:"React",
          percentage: 80
        },
        {
          name:"Java",
          percentage: 60
        },
        {
          name:"NodeJs",
          percentage: 75
        },
        {
          name:"Django",
          percentage: 65
        },
        {
          name:"Python",
          percentage: 70
        },
        {
          name:"Boostrap",
          percentage: 70
        }
      ]
    }

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
