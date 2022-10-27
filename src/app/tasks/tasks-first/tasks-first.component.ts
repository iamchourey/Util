import { Component, OnInit } from '@angular/core';
import { tasksService } from '../tasks.service';
import { Task } from '../tasks.model'

@Component({
  selector: 'app-tasks-first',
  templateUrl: './tasks-first.component.html',
  styleUrls: ['./tasks-first.component.css']
})
export class TasksFirstComponent implements OnInit {

  enteredtitle='';
  enteredcontent='';
  tasks:Task;

  constructor(public tasksService:tasksService) { }

  onTaskCreate(){
    this.tasksService.addTask(this.enteredtitle,this.enteredcontent);
    this.enteredtitle='';
    this.enteredcontent='';
  }
  ngOnInit() {
  }

}
