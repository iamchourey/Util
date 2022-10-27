import { Component } from '@angular/core';
import { authService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Util';
  constructor(private authService: authService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
