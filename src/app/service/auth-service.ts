import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loggedUser = signal<string>("")
  loggedUserId: number = 0

  readLoggedUserFromStorage() {
    const loggedUser = localStorage.getItem("loggedUser")
    if (loggedUser != null) {
      this.loggedUser.set(loggedUser)
      this.loggedUserId = Number(localStorage.getItem("loggedUserId"))
    } else {
      this.loggedUser.set("")
      this.loggedUserId = 0
    }
    this.loggedUser.update
  }

  mockUserWithId() {
    return {
      id: this.loggedUserId,
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      balance: 0,
      active: true
    }
  }
  
}
