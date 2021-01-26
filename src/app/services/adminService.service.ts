import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';


export interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private tokenExpirationTimer:any;
  admin: BehaviorSubject<boolean>= new BehaviorSubject(false);
  loginURL:string=`${environment.loginURL}?key=${environment.key}`;

  firebaseURL:string=environment.firebaseURL;

  token:string;

  constructor(
    private route: Router,
    private http: HttpClient) { }

  adminLogin(email:string,password:string){

    return this.http.post<AuthResponseData>(
        this.loginURL,
        {
            email,
            password,
            returnSecureToken:true
        }
      ).pipe(
        tap(resData=>{
            this.handleAuthentication(
              resData.idToken,
              +resData.expiresIn
            )
        })
      );
  }

  private handleAuthentication(
    idToken:string,
    expiresIn:number)
  {
    const expirationDate=new Date(new Date().getTime()+expiresIn*1000);
   
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('loginData',JSON.stringify({idToken,expirationDate}));
    this.token=idToken;
  }

  autoLogin(){
    const loginData:{
      idToken:string;
      expirationDate:string;
    }=JSON.parse(localStorage.getItem('loginData'));
    if(!loginData)
        return;
    
    if(loginData.idToken){

        this.token=loginData.idToken;

        const expirationDuration=new Date(loginData.expirationDate).getTime()-new Date().getTime();
        
        this.admin.next(true);

        this.autoLogout(expirationDuration);
    }   
}

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer=setTimeout(()=>{
        this.adminLogout();
    },expirationDuration);
  }

  adminLogout(){
    localStorage.removeItem('loginData');
    if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
    }
    this.admin.next(false)
    this.route.navigate(["home"]);
  }

  getMessages(){
    return this.http.get(`${this.firebaseURL}/messages.json`, {
      responseType: 'json',
      params:new HttpParams().set('auth',this.token)
    });
  }

}
