import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth/auth.guard';
import { RequestResetComponent } from './auth/request-reset/request-reset.component';
import { ResponseResetComponent } from './auth/response-reset/response-reset.component';




const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'tasks',component:TasksComponent,canActivate:[AuthGuard]},
  {path:'chat',component:ChatComponent,canActivate:[AuthGuard]},
  {path:'password-reset',component:RequestResetComponent},
  {path:'response-reset-password/:token',component:ResponseResetComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
