import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    
    if (token !== null && token !== undefined) {
      return true;
    } else {
      return false;
    }
  } 
}
