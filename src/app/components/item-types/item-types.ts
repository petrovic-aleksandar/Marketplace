import { Component, resource } from '@angular/core';

@Component({
  selector: 'app-item-types',
  imports: [],
  templateUrl: './item-types.html',
  styleUrl: './item-types.css'
})
export class ItemTypes {

  imagesLocation: string = "http://localhost:8080/"

  itemTypes = resource({
    loader: async () => {
      const result = await fetch(('https://localhost:7294/api/Item/Types'))
      return result.json();
    }
  })

  pathById(path:string) {
    return this.imagesLocation + path
  } 

}
