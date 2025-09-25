import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)

  readonly api:string = "https://localhost:7294/api/User/";

  getUsers() {
    return this.http.get(this.api)
  }

  getUserById(id:number) {
    return this.http.get(this.api + id)
  }

  addUser(u:User) {
    return this.http.post(this.api, u)
  }

  updateUser(u:User, id:number) {
    return this.http.put(this.api + id, u)
  }

  deleteUser(id:number) {
    return this.http.put(this.api + "Delete/" + id, null)
  }
  
}
