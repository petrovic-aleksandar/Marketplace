import { ChangeDetectorRef, Component, inject, OnInit, resource, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../service/item-service';
import { Item } from '../../model/item';
import { ItemType } from '../../model/item-type';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../service/auth-service';
import { GlobalService } from '../../service/global-service';
import { ItemReq } from '../../model/request/item-req';
import { NgSelectComponent } from '@ng-select/ng-select';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-items',
  imports: [ReactiveFormsModule,DatePipe,NgSelectComponent],
  templateUrl: './user-items.html',
  styleUrl: './user-items.css'
})
export class UserItems implements OnInit {

  globalService = inject(GlobalService)
  itemService = inject(ItemService)
  authService = inject(AuthService)
  http = inject(HttpClient)
  cdr = inject(ChangeDetectorRef)

  itemList: Item[] = []
  itemTypes: ItemType[] = []

  itemForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    price: new FormControl(0),
    typeId: new FormControl(0),
    sellerId: new FormControl(0)
  })

  formToItemReq(): ItemReq {
    return {
      name: this.itemForm.value.name,
      description: this.itemForm.value.description,
      price: this.itemForm.value.price,
      typeId: this.itemForm.value.typeId,
      sellerId: this.authService.loggedUserId
    }  
  }

  ngOnInit(): void {
    this.loadItemTypes()
    this.loadItemsByUser()
  }

  loadItemTypes() {
    this.itemService.getItemTypes().subscribe({
      next:(types)=>{
        this.itemTypes = types as ItemType[]
        this.cdr.markForCheck()
      }})
    }

  loadItemsByUser() {
    this.itemService.getItemsByUser(this.authService.loggedUserId).subscribe({
      next:(items)=>{
        this.itemList = items as Item[]
        this.cdr.markForCheck()
      }}) 
  }

  edit(i:Item) {
    this.itemForm.controls['id'].setValue(i.id)
    this.itemForm.controls['name'].setValue(i.name)
    this.itemForm.controls['description'].setValue(i.description)
    this.itemForm.controls['price'].setValue(i.price)
    this.itemForm.controls['typeId'].setValue(i.type.id)
  }

  reset() {
    this.itemForm.reset()
  }

  add() {
    this.itemService.add(this.formToItemReq()).subscribe({
      next:()=>{
        alert("Item created.")
        this.loadItemsByUser()
        this.reset()
      },
      error:(error)=>{
        if (error.status == 200) {
          alert("Item created.")
          this.loadItemsByUser()
          this.reset()
          return
        }
        alert("error: " + error.error)
      }
    });
  }

  update(id:number) {
    this.itemService.update(id, this.formToItemReq()).subscribe({
      next:()=>{
        alert("Item updated.")
        this.loadItemsByUser()
        this.reset()
      },
      error:(error)=>{
        if (error.status == 200) {
          alert("Item updated.")
          this.loadItemsByUser()
          this.reset()
          return
        }
        alert("error: " + error.error)
      }
    })
  }

  deactivate(id:number) {
    this.itemService.deactivate(id).subscribe({
      next:()=>{
        alert("Item deactivated.")
        this.loadItemsByUser()
      },
      error:(error)=>{
        if (error.status == 200) {
          alert("Item deactivated.")
          this.loadItemsByUser()
          return
        }
        alert("error: " + error.error)
      }
    })
  }

  activate(id:number) {
    this.itemService.activate(id).subscribe({
      next:()=>{
        alert("Item activated.")
        this.loadItemsByUser()
      },
      error:(error)=>{
        if (error.status == 200) {
          alert("Item activated.")
          this.loadItemsByUser()
          return
        }
        alert("error: " + error.error)
      }
    })
  }

  delete(id:number) {
    this.itemService.delete(id).subscribe({
      next:()=>{
        alert("item deleted")
        this.loadItemsByUser()
      },
      error:(error)=>{
        if (error.status == 200) {
          alert("item deleted")
          this.loadItemsByUser()
          return
        }
        alert("error: " + error.error)
      }
    })
  }
}
