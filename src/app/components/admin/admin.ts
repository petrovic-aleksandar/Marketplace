import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user-service';
import { User } from '../../model/user';
import { MonetaryPipe } from '../../pipes/monetary-pipe';
import { GlobalService } from '../../service/global-service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule,MonetaryPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  userService = inject(UserService)
  globalService = inject(GlobalService)
  cdr = inject(ChangeDetectorRef)

  userList: User[] = []

  userForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required]),
    role: new FormControl("User")
  })

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.userService.getUsers().subscribe((result:any)=>{
      this.userList = result
      this.cdr.markForCheck()
    })
  }

  formToUser(): User {
    return {
      id: 0,
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      balance: 0,
      active: true,
      role: this.userForm.value.role
    }
  }

  editUser(u:User) {
    this.userForm.controls['id'].setValue(u.id)
    this.userForm.controls['username'].setValue(u.username)
    this.userForm.controls['password'].setValue(u.password)
    this.userForm.controls['name'].setValue(u.name)
    this.userForm.controls['email'].setValue(u.email)
    this.userForm.controls['phone'].setValue(u.phone)
    this.userForm.controls['role'].setValue(u.role)
  }

  resetUser() {
    this.userForm.controls['id'].setValue(0)
    this.userForm.controls['username'].setValue("")
    this.userForm.controls['password'].setValue("")
    this.userForm.controls['name'].setValue("")
    this.userForm.controls['email'].setValue("")
    this.userForm.controls['phone'].setValue("")
    this.userForm.controls['role'].setValue("User")
  }

  saveNewUser() {
    this.userService.addUser(this.globalService.toUserReq(this.formToUser())).subscribe({
      next:()=>{
        alert("user created")
        this.loadUsers()
      },
      error:(error)=>{
        alert("error: " + error.error)
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.formToUser(), this.userForm.value.id).subscribe({
      next:()=>{
        alert("user updated")
        this.loadUsers()
      },
      error:(error)=>{
        alert("error: " + error.error)
      }
    })
  }

  deleteUser(u:User) {
    this.userService.deleteUser(u.id).subscribe({
      next:()=>{
        alert("user deleted")
        this.loadUsers()
      },
      error:(error)=>{
        alert("error: " + error.error)
      }
    })
  }
}
