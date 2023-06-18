import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { GroupStateService } from './group-state.service';
import { Router } from '@angular/router';
import { IResponse, UserService, initial_state_value } from '../user/user.service';

@Component({
  selector: 'app-add-group',
  template: `
   <header>
   <nav>
                <ul>
                    <li><a [routerLink]="['']">Home</a></li>
                    <li><a [routerLink]="['', 'group', 'list']">Groups</a></li>
                    <li><a [routerLink]="['', 'group', 'add']">Create group</a></li>
                    <li><a [routerLink]="['', 'group', 'request']">Pending Request</a></li>
                    <li><a [routerLink]="['']"  (click)="logout()">Logout</a></li>
                </ul>
    </nav>
  </header>
   <div class="container">
   <h2>Add New Group</h2>
    <form [formGroup]="addGoupForm" (ngSubmit)="addGroup()" class="my-form">
      <input placeholder="Title" formControlName="title"  class="form-input"/>
      <button type="submit" [disabled]="addGoupForm.invalid" class="form-button">Add Group</button>
    </form>
   </div>
  `,
  styles: [`header {
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 25px 0 black;
    z-index: 1;
}

header * {
    display: inline;
}

header li {
    margin: 20px;
    margin-right: 20px;
    font-size: 25px;

},
.mydata{
  margin-top: 80px; 
}
.container{
  height: 125vh;
    background-image: url('https://mma.prnewswire.com/media/1498250/Splitwise_Logo.jpg?p=facebook');
    background-size: cover;
    font-family: sans-serif;
    margin-top: 80px;
    padding: 30px;
}

header li a {
    color: black;
    text-decoration: none;
}


div {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
.my-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.form-input {
  padding: 10px;
  margin-bottom: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  padding: 10px 20px;
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

`],

})
export class AddGroupComponent {
  addGoupForm = inject(FormBuilder).group({
    title: ['', Validators.required],
  });
  private groupService = inject(GroupStateService);
  private router = inject(Router);
  private userService = inject(UserService)

  addGroup() {
    this.groupService
      .addGroup(this.addGoupForm.value as string)
      .subscribe((res) => {
        if (res.success) {
          this.router.navigate(['', 'group', 'list']);
        }
      });
  }

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);
  }
}
