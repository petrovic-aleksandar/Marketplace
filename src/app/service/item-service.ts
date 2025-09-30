import { inject, Injectable, resource, signal } from '@angular/core';
import { Item } from '../model/item';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global-service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  http = inject(HttpClient)
  globalService = inject(GlobalService)
  
  readonly api:string = this.globalService.getApi("Item")

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
