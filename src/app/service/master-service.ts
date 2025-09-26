import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  loggedUser = signal<string>("")

  readLoggedUserFromStorage() {
    const loggedUser = localStorage.getItem("loggedUser")
    if (loggedUser != null)
      this.loggedUser.set(loggedUser)
    else
      this.loggedUser.set("")
    this.loggedUser.update
  }

}
