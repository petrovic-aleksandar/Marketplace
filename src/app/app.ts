import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  router = inject(Router)

  loggedUser: string = ""

  ngOnInit(): void {
    this.readLoggedUser()
  }

  readLoggedUser() {
    const loggedUsername = localStorage.getItem("loggedUser")
    if (loggedUsername != null)
      this.loggedUser = loggedUsername
  }

  logout() {
    localStorage.removeItem("loggedUser")
    this.readLoggedUser()
    this.router.navigateByUrl("/login")
  }
}
