import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authService } from './auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor{

  constructor(private authService:authService){}
  intercept(req:HttpRequest<any>,next:HttpHandler){
    const authToken=this.authService.getToken();
    const authRequest=req.clone({
      headers:req.headers.set('Authorization',"bearer "+authToken)
    });
    return next.handle(authRequest);
  }
}
