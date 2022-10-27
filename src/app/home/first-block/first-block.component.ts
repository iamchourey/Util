import { Component, OnInit } from '@angular/core';
import { authService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-first-block',
  templateUrl: './first-block.component.html',
  styleUrls: ['./first-block.component.css']
})
export class FirstBlockComponent implements OnInit {

  public username:string;
  public now=new Date();
  public month=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
  date  = (("0"+this.now.getDate()).slice(-2)) +" "+this.month[this.now.getMonth()] +" "+ (this.now.getFullYear()) +" "+ (("0"+this.now.getHours()).slice(-2)) +":"+ (("0"+this.now.getMinutes()).slice(-2));


  isPassword=false;
  checkBox(){
    this.isPassword=!this.isPassword;
  }

  constructor(private authService:authService) {
    this.username=this.authService.getUsername();
  }

  ngOnInit() {
  }

}
