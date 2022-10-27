import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDialogModule
} from "@angular/material";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FirstBlockComponent } from './home/first-block/first-block.component';
import { SecondBlockComponent } from './home/second-block/second-block.component';
import { TasksFirstComponent } from './tasks/tasks-first/tasks-first.component';
import { TasksSecondComponent } from './tasks/tasks-second/tasks-second.component';
import { ErrorComponent } from "./error/error.component";
import { authInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { RequestResetComponent } from './auth/request-reset/request-reset.component';
import { ResponseResetComponent } from './auth/response-reset/response-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    ChatComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FirstBlockComponent,
    SecondBlockComponent,
    TasksFirstComponent,
    TasksSecondComponent,
    ErrorComponent,
    RequestResetComponent,
    ResponseResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    NgxDropzoneModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:authInterceptor,multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],

  exports:[ReactiveFormsModule]
})
export class AppModule { }
