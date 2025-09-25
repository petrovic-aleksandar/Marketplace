import { inject, Injectable, resource } from '@angular/core';
import { Item } from '../model/item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  http = inject(HttpClient)
  
  readonly api:string = "https://localhost:7294/api/Item/";

  getItemsByUser(userId:number) {
    return resource({
      loader:() => {
        return fetch((this.api + "byUserId/" + userId))
      } 
    })
  }

  addItem(i:Item) {
    return this.http.post(this.api, i)
  }

}
