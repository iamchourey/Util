import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Task } from "./tasks.model";

@Injectable({ providedIn: "root" })
export class tasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  gettasks() {
    this.http
      .get<{ message: string; tasks: any }>(
        "http://localhost:3000/api/tasks"
      )
      .pipe(map((taskData) => {
        return taskData.tasks.map(task => {
          return {
            title: task.title,
            content: task.content,
            id: task._id,
            creator:task.creator
          };
        });
      }))
      .subscribe(transformedTasks => {
        this.tasks = transformedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  addTask(title: string, content: string) {
    const task: Task = { id: null, title: title, content: content,creator:null};
    this.http
      .post<{ message: string,taskId:string }>("http://localhost:3000/api/tasks",task)
      .subscribe(responseData => {
        const id=responseData.taskId;
        task.id=id;
        this.tasks.push(task);
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  deleteTask(taskId: string) {
    this.http.delete("http://localhost:3000/api/tasks/" + taskId)
      .subscribe(() => {
        const updatedTasks = this.tasks.filter(task => task.id !== taskId);
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }
}
