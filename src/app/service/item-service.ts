import { inject, Injectable, resource, signal } from '@angular/core';
import { Item } from '../model/item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  http = inject(HttpClient)
  
  readonly api:string = "https://localhost:7294/api/Item/";

  addItem(i:Item) {
    return this.http.post(this.api, i)
  }

  updateItem(i:Item) {
    return this.http.put(this.api + i.id, i)
  }

  deleteItem(i:Item) {
    return this.http.put(this.api + "Delete/" + i.id, i)
  }

}
