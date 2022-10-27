import { Component, OnInit } from '@angular/core';
import { authService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(public authService:authService) { }

  onSignup(form: NgForm){
    if(form.invalid){
       return;
    }
    this.authService.createUser(form.value.enteredusername,form.value.enteredemail,form.value.enteredpassword);

  }
  ngOnInit() {
  }

}
