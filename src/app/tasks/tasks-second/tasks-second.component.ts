import { Component, OnInit, OnDestroy} from '@angular/core';
import { Task } from '../tasks.model';
import { tasksService } from '../tasks.service';
import { Subscription } from 'rxjs';
import { authService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-tasks-second',
  templateUrl: './tasks-second.component.html',
  styleUrls: ['./tasks-second.component.css'],
})
export class TasksSecondComponent implements OnInit,OnDestroy {

  tasks: Task[] = [];
  private tasksSub: Subscription;
  userId:string;
  userIsAuthenticated=false;
  private authStatusSub:Subscription;

  constructor(public tasksService: tasksService,public authService:authService) {}

  ngOnInit() {
    this.tasksService.gettasks();
    this.userId = this.authService.getUserId();
    this.tasksSub = this.tasksService
      .getTaskUpdateListener()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(taskId: string) {
    this.tasksService.deleteTask(taskId);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}



