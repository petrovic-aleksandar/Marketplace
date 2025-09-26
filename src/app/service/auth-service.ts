import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loggedUser = signal<string>("")
  loggedUserId: number = 0
  loggedUserRole = signal<string>("")

  readLoggedUserFromStorage() {
    const loggedUser = localStorage.getItem("loggedUser")
    if (loggedUser != null) {
      this.loggedUser.set(loggedUser)
      this.loggedUserId = Number(localStorage.getItem("loggedUserId"))
      const loggedUserRole = localStorage.getItem("loggedUserRole")
      if (loggedUserRole != null)
        this.loggedUserRole.set(loggedUserRole)
      else
        this.loggedUserRole.set("")
    } else {
      this.loggedUser.set("")
      this.loggedUserId = 0
      this.loggedUserRole.set("")
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
      active: true,
      role: -1
    }
  }
  
}
