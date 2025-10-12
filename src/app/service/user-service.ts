import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user';
import { GlobalService } from './global-service';
import { UserReq } from '../model/userReq';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)
  globalService = inject(GlobalService)

  readonly api:string = this.globalService.getApi("User")

  getUsers() {
    return this.http.get(this.api)
  }

  addUser(u:UserReq) {
    return this.http.post(this.api, u)
  }

  updateUser(u:User, id:number) {
    return this.http.put(this.api + id, u)
  }

  deleteUser(id:number) {
    return this.http.put(this.api + "Delete/" + id, null)
  }
  
}
