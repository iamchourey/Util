import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../auth.service';
import { Subscription } from 'rxjs';
import { format } from 'url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private authStatusSub:Subscription;
  form:NgForm;

  constructor(public authService:authService) { }

  onLogin(form:NgForm)
  {
    if(form.invalid){
      this.form.reset();
      return;
    }
    this.authService.login(form.value.enteredusername,form.value.enteredpassword);
  }

  ngOnInit() {

  }

}
