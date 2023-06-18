import { Component, ElementRef, inject, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { GroupStateService, IGroup, ITransaction } from './group-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { initial_state_value, UserService } from '../user/user.service';

@Component({
  selector: 'app-group-detail',
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
<div class="container">
<input type="text" name="search" 
  placeholder="Search transaction"  #myInput
  (input)="filterTransactions()" class="search-input" />
  
<table>
<thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Paid_by</th>
        <th>Receipt</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let trans of filteredTransactions">
        <td>{{ trans.title }}</td>
        <td>{{ trans.description }}</td>
        <td>{{ trans.category }}</td>
        <td>{{ trans.amount | currency }}</td>
        <td>{{ trans.date| date}}</td>
        <td>{{ trans.paid_by.fullname }}</td>
        <td>
        <a [routerLink]="['group',group_id,'detail','view']">{{ trans.receipt.originalname }}</a>
        
       </td>
      </tr>
    </tbody>
    </table>
</div>

  `,
  styles: [`
    .table-container {
    max-width: 800px;
    margin: 0 auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
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
.search-input {
  padding: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
  `
  ],
    
})
export class GroupDetailComponent {
  @ViewChild('myInput',{static: false}) myInput!: ElementRef;

  private groupService = inject(GroupStateService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  searchText: string= ''

  transactions: ITransaction[] = [];

  filteredTransactions: ITransaction[] = [];

  group_id = this.activatedRoute.snapshot.paramMap.get('group_id')

  constructor() {
    if (this.group_id) {
      this.groupService.getAllTransactions(this.group_id).subscribe(response => {
        if (response.success) {
          this.transactions = response.data
          this.filteredTransactions = this.transactions
        }
      })
    
    }
  }

  filterTransactions() {
    let searchText = this.myInput.nativeElement.value.toLowerCase();
    if (!searchText) {
      this.filteredTransactions = this.transactions;
      return;
    }

    this.filteredTransactions = this.filteredTransactions.filter(
      (trans) =>
        trans.title.toLowerCase().includes(searchText) ||
        trans.paid_by.fullname.toLowerCase().includes(searchText) ||
        trans.category.toLowerCase().includes(searchText) ||
        trans.date.toString().toLowerCase().includes(searchText)
    );
  }

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);
   
    
  }
}
