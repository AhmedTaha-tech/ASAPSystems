import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  @ViewChild('notification', { static: true }) notification: any;

  constructor(private notificationService: NotificationService,private router: Router,private localStorage:LocalStorageService) {}

  onLogin() {
    if (this.username === 'admin' && this.password === '123') {
      this.notificationService.show({
        content: 'Login successful!',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'right', vertical: 'top' },
        type: { style: 'success', icon: true }
      });
      this.localStorage.setUserIdInLocalStorage("UserId");
      this.localStorage.setTokenInLocalStorage("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmRyZWQiLCJ1c2VyX2lkIjoiMDI5YWNmZGMtOTQyOS00M2RhLTgzYTctNTJhYTQ5NzZjZDY2IiwidHlwZV91c2VyIjoiMiIsImV4cCI6MTc0MjAzODk3MiwiaXNzIjoiaHR0cDovL3d3dy5zZWN1cml0eS5vcmciLCJhdWQiOiJodHRwOi8vd3d3LnNlY3VyaXR5Lm9yZyJ9.pII4ehKpoq4p2Rku7AiwRWKkwbThPrOomtBZsalG6jM");
      this.router.navigate(['/']);
    } else {
      this.notificationService.show({
        content: 'Invalid credentials, please try again.',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'right', vertical: 'top' },
        type: { style: 'error', icon: true }
      });
    }
  }
}
