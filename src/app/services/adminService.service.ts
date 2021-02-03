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

export interface RefreshTokenAuthResponseData{
  access_token:string;
  token_type:string;
  refresh_token:string;
  id_token:string;
  expires_in:string;
  user_id:string;
  project_id?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private tokenExpirationTimer:any;
  admin: BehaviorSubject<boolean>= new BehaviorSubject(false);
  loginURL:string=`${environment.loginURL}?key=${environment.key}`;
  refreshTokenURL:string=`${environment.refreshTokenURL}?key=${environment.key}`;

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
              +resData.expiresIn,
              resData.refreshToken
            )
        })
      );
  }

  private handleAuthentication(
    idToken:string,
    expiresIn:number,
    refreshToken:string)
  {
    const expirationDate=new Date(new Date().getTime()+expiresIn*1000);
   
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('loginData',JSON.stringify({idToken,expirationDate,refreshToken}));
    this.token=idToken;
  }

  autoLogin(){
    const loginData:{
      idToken:string,
      expirationDate:string,
      refreshToken:string
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
        this.getRefreshedToken();
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

  getRefreshedToken(){

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }

    const loginData:{
      idToken:string,
      expirationDate:string,
      refreshToken:string
    }=JSON.parse(localStorage.getItem('loginData'));

    if(!loginData){
      return;
    }

    if(loginData.refreshToken){
      this.http.post<RefreshTokenAuthResponseData>(
        this.refreshTokenURL,
        {
            grant_type: "refresh_token",
            refresh_token: loginData.refreshToken
        }
      ).subscribe(resData=>
        {
          this.handleAuthentication(
            resData.id_token,
            +resData.expires_in,
            resData.refresh_token
          );
          this.admin.next(true);

        },
        error=>{
          this.admin.next(false)
          this.route.navigate(["home"]);
          localStorage.removeItem('loginData');
        }
      )
    }
    else{
      localStorage.removeItem('loginData');
      this.admin.next(false);
    }
  }

  getMessages(){
    return this.http.get(`${this.firebaseURL}/messages.json`, {
      responseType: 'json',
      params:new HttpParams().set('auth',this.token)
    });
  }

}
