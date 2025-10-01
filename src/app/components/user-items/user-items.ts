import { Component, computed, inject, OnInit, resource, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../service/item-service';
import { Item } from '../../model/item';
import { ItemType } from '../../model/item-type';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../service/auth-service';
import { GlobalService } from '../../service/global-service';

@Component({
  selector: 'app-user-items',
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './user-items.html',
  styleUrl: './user-items.css'
})
export class UserItems implements OnInit {

  globalService = inject(GlobalService)
  itemService = inject(ItemService)
  authService = inject(AuthService)

  readonly mockType: ItemType = {
    id: 1,
    name: "",
    description: "",
    imagePath: ""
  }

  itemList: Item[] = []

  itemForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    price: new FormControl(0)
  })

  x: any 

  formToItem(): Item {
    return {
      id: this.itemForm.value.id,
      name: this.itemForm.value.name,
      description: this.itemForm.value.description,
      price: this.itemForm.value.price,
      type: this.mockType,
      isActive: true,
      createtime: "1995-04-07T00:00:00",
      seller: this.authService.mockUserWithId(),
      images: []
    }  
  }

  itemsByUserResource = resource({
    params: () => ({id: this.authService.loggedUserId}),
    loader: async ({params}) => {
      const result = await fetch(this.globalService.getApi("Item") + 'byUserId/' + params.id);
      return result.json();
    }
  })

  ngOnInit(): void {
    
  }

  editItem(i:Item) {
    this.itemForm.controls['id'].setValue(i.id)
    this.itemForm.controls['name'].setValue(i.name)
    this.itemForm.controls['description'].setValue(i.description)
    this.itemForm.controls['price'].setValue(i.price)
  }

  resetItem() {
    this.itemForm.controls['id'].setValue(0)
    this.itemForm.controls['name'].setValue("")
    this.itemForm.controls['description'].setValue("")
    this.itemForm.controls['price'].setValue(0)
  }

  saveNewItem() {
    this.itemService.addItem(this.formToItem()).subscribe({
      next:()=>{
        alert("item created")
        this.itemsByUserResource.reload()
      },
      error:(error)=>{
        alert("error: " + error.error)
      }
    });
  }

  updateItem() {
    this.itemService.updateItem(this.formToItem()).subscribe({
      next:()=>{
        alert("item updated")
        this.itemsByUserResource.reload()
      },
      error:(error)=>{
        alert("error: " + error.error)
      }
    })
  }

  deleteItem(i:Item) {
    this.itemService.deleteItem(this.formToItem()).subscribe({
      next:()=>{
        alert("item deleted")
        this.itemsByUserResource.reload()
      },
      error:(error)=>{
        alert("error: " + error.error)
      }
    })
  }
}
