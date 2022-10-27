import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable()


export class ChatService{



   constructor(private http:HttpClient){}


    private socket = io('http://localhost:3000');

    joinRoom(data)
    {
        this.socket.emit('join',data);
       // console.log(data);
        this.saveChat({username:data.username,room:data.room,message:data.username + ' has joined the room',updated_at:data.updated_at});
    }

    newUserJoined()
    {
        let observable = new Observable<{username:String, message:String,updated_at:string}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                console.log(data);
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
        this.saveChat({username:data.user,room:data.room,message:data.user + ' has left the room',updated_at:data.updated_at});
    }

    userLeftRoom(){
        let observable = new Observable<{username:String, message:String,updated_at:string}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
       // console.log(data);
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{username:String, message:String,updated_at:string}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    getChats(room) {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/api/chat/' + room)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }

    saveChat(data) {
      return new Promise((resolve, reject) => {
          this.http.post('http://localhost:3000/api/chat', data)
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
      });


}

}

