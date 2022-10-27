import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn:"root"})
export class authService{

  private token:string;
  private username:string;
  private tokenTimer:any;
  private userId:string;
  private authStatusListner=new Subject<boolean>();
  private isAuthenticated=false;

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListner(){
    return this.authStatusListner.asObservable();
  }

  getUserId()
  {
    return this.userId;
  }

  getUsername()
  {
    return this.username;
  }

  constructor(private http:HttpClient,private router:Router){}

  createUser(username:string,email:string,password:string){
    const authData:AuthData={username:username,email:email,password:password}
    this.http.post("http://localhost:3000/api/users/signup",authData)
     .subscribe(response=>{
       console.log(response);
       this.router.navigate(['/'])
     }, error =>{
       this.authStatusListner.next(false);
     }
     )
  }

  login(username:string,password:string){
    const authData={username:username,password:password}
    this.http.post<{token:string;expiresIn:number,userId:string,username:string}>("http://localhost:3000/api/users/login",authData)
     .subscribe(response=>{
       const token=response.token;
       this.token=token;
       if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListner.next(true);
        this.userId=response.userId;
        this.username=response.username;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate,this.userId);
        this.router.navigate(["/home"]);
      }

     })
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.userId=null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);

  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId=authInformation.userId;
      this.username=authInformation.username;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date,userId:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId",this.userId);
    localStorage.setItem("username",this.username);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const username=localStorage.getItem("username");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId:userId,
      username:username
    }
  }


  //RESET PASSWORD
  requestReset(body): Observable<any> {
    return this.http.post(`http://localhost:3000/api/users/req-reset-password`, body);
  }

  newPassword(body): Observable<any> {
    return this.http.post(`http://localhost:3000/api/users/new-password`, body);
  }

  ValidPasswordToken(body): Observable<any> {
    return this.http.post(`http://localhost:3000/api/users/valid-password-token`, body);
  }

}
