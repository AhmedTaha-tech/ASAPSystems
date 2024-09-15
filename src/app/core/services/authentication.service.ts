import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private localStorage:LocalStorageService) { }

  isAuthenticated(): boolean {
    return this.localStorage.retrieveUserIdFromLocalStorage()!="";
  }

  login(userId:string): void {
    this.localStorage.setUserIdInLocalStorage(userId);
  }

  logout(): void {
    this.localStorage.removeUserIdFromLocalStorage();
  }
}
