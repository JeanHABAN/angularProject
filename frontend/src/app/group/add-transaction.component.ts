import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupStateService } from './group-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, initial_state_value } from '../user/user.service';

@Component({
  selector: 'app-add-transaction',
  template: `
    <header >
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
  <div class="content-container">
   <div class="container">
   <h3>Add New Transaction</h3>
    <div class="form">
      <form
        class="login-form"
        [formGroup]="transForm"
        (ngSubmit)="addTransaction()"
      >
        <input placeholder="Title" formControlName="title" />
        <input placeholder="Description" formControlName="description" />
        <input placeholder="Category" formControlName="category" />
        <input placeholder="Amount" type="number" formControlName="amount" />
        <input placeholder="Date" type="date" formControlName="date" />
        <input
          placeholder="Upload your receipt here"
          type="file"
          formControlName="receipt"
          accept="image/png, application/pdf"
          (change)="uploadFile($event)"
        />
        <button type="submit" [disabled]="transForm.invalid">Add</button>
      </form>
    </div>
   </div>
   </div>
  `,
  styles: [
    `
      .form {
        position: relative;
        z-index: 1;
        background: #ffffff;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2),
          0 5px 5px 0 rgba(0, 0, 0, 0.24);
      }
      .form input {
        font-family: 'Roboto', sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
      }
      .form button {
        font-family: 'Roboto', sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #4caf50;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #ffffff;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
      }
      .form button:hover,
      .form button:active,
      .form button:focus {
        background: #43a047;
      }
  header {
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
.content-container {
  position: absolute;
  top: 80px; /* Height of the fixed header */
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

header li a {
    color: black;
    text-decoration: none;
}
header button {
  margin-right: 20px;
  border-radius: 2px;
},


div {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
h3{
  text-align: center;
}
    `,
  ],
})
export class AddTransactionComponent {
  private userService = inject(UserService)
  transForm = inject(FormBuilder).group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    amount: [0, Validators.required],
    date: [Date.now(), Validators.required],
    receipt: ['', Validators.required],
  });

  receiptFile!: File;
  groupService = inject(GroupStateService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private groupId = this.activatedRoute.snapshot.paramMap.get('group_id');

  uploadFile(e: Event) {
    const receiptInput = e.target as HTMLInputElement;
    if (receiptInput.files) {
      this.receiptFile = receiptInput.files[0];
    }
  }
  addTransaction() {
    console.log('hello')
    const date: Date = new Date(this.transForm.get('date')?.value!);
    console.log('date: ', date);
    const form_data = new FormData();
    form_data.append('title', this.transForm.get('title')?.value!);
    form_data.append('description', this.transForm.get('description')?.value!);
    form_data.append('category', this.transForm.get('category')?.value!);
    form_data.append('amount', String(this.transForm.get('amount')?.value!));
    form_data.append('date', String(date.getTime()));
    form_data.append('receipt', this.receiptFile);
    this.groupService
      .addTransaction(this.groupId!, form_data)
      .subscribe((res) => {
        this.router.navigate(['', 'group', 'list']);
      });
  }


  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);


  }
}
