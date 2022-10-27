import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {ChatService} from './chat.service';
import { authService } from '../auth/auth.service';
import { ErrorService } from '../error/error.service';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers:[ChatService]
})
export class ChatComponent implements OnInit,AfterViewChecked {


  username:String=this.authService.getUsername();
  room:String;
  messageText:String;
  updated_at=Date.now();
  messageArray:Array<{username:String,message:String,updated_at:string}> = [];
  chats:any=[];
  container:HTMLElement;
  roomParaText:string="Join a Room To Chat"


  constructor(private _chatService:ChatService,private authService:authService,private errorService:ErrorService){
      this._chatService.newUserJoined()
      .subscribe(data=>
        this.messageArray.push(data)
        );


      this._chatService.userLeftRoom()
      .subscribe(data=>this.messageArray.push(data));

      this._chatService.newMessageReceived()
      .subscribe(data=>this.messageArray.push(data));
  }


  join(){
       if(this.room!==undefined){
        this.roomParaText="Connected To "+this.room;
        this._chatService.joinRoom({username:this.username, room:this.room,updated_at:this.updated_at});
        this._chatService.getChats(this.room).then(
        (res)=>{
          this.chats=res;
          this.messageArray=this.chats;
        },(err)=>{
          console.log(err);
        })
     // console.log(this.chats);
  }else{
    this.roomParaText="Plese Enter a Room"
  }
  }
  leave(){
     if(this.room!==undefined){
      this._chatService.leaveRoom({username:this.username, room:this.room,updated_at:this.updated_at});
      // this.chats=[];
      this.messageArray.length=0;
      this.roomParaText="Join a Room To Chat"
      this.room='';
  }
}

  sendMessage()
  {
      this._chatService.saveChat({room:this.room,username:this.username,message:this.messageText,updated_at:this.updated_at})
      .then((data)=>{
        this._chatService.sendMessage(data);
      },(err)=>{
        console.log(err);
      })
      this.messageText='';

  }

  ngOnInit() {
  }

  ngAfterViewChecked(){
    this.container=document.getElementById('main-chat');
    this.container.scrollTop=this.container.scrollHeight;
  }

}
