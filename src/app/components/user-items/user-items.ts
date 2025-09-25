import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../service/item-service';
import { User } from '../../model/user';
import { Item } from '../../model/item';
import { ItemType } from '../../model/item-type';

@Component({
  selector: 'app-user-items',
  imports: [ReactiveFormsModule],
  templateUrl: './user-items.html',
  styleUrl: './user-items.css'
})
export class UserItems implements OnInit {

  itemService = inject(ItemService)

  readonly mockUser: User = {
    id: 1,
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    balance: 0,
    active: true
  }

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
      id: 0,
      name: this.itemForm.value.name,
      description: this.itemForm.value.description,
      price: this.itemForm.value.price,
      type: this.mockType,
      isActive: true,
      createtime: "1995-04-07T00:00:00",
      seller: this.mockUser
    }  
  }

  ngOnInit(): void {
    
  }

  resetItem() {
    
  }

  saveNewItem() {
    this.itemService.addItem(this.formToItem()).subscribe({
      next:()=>{
        alert("user created")
        //this.loadItems()
      },
      error:(error)=>{
        alert("error: " + error.error)
      }
    });
  }

  updateItem() {

  }
}
