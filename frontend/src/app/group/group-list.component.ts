import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { GroupStateService, IGroup } from './group-state.service';
import { Router } from '@angular/router';
import { UserService, initial_state_value } from '../user/user.service';

@Component({
  selector: 'app-group-list',
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
  
   
    <div *ngIf="showMember">
      <app-add-members
        [groupId]="selectedGroupId"
        (isCompleted)="receiveStatusAddingMember($event)"
      />
    </div>
    <div>
      <table>
        <th>Title</th>
        <th>Action</th>
        <tr *ngFor="let g of groupsList">
          <td>{{ g.title }}</td>
          <td>
            <button (click)="showAddMember(g._id)" [disabled]="showMember">
              Add Members
            </button>
            <button (click)="gotoAddTransaction(g._id)" [disabled]="showMember">
              Add Transactions
            </button>
            <button (click)="gotoDetails(g._id)" [disabled]="showMember">
              Details
            </button>
            <button (click)="gotoReport(g._id)" [disabled]="showMember">
              Report
            </button>
           
          </td>
        </tr>
      </table>
    </div>
  </div>
  `,
  styles: [`

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


input[type="text"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

div {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 8px;
  text-align: left;
  color: blue;
  font-size: 26px;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
  
}

button {
  margin-left: 10px;
  font-size: 16px
},
td {
  text-align: right; 
}

`],
})
export class GroupListComponent {

  groupService = inject(GroupStateService);
  groupsList: IGroup[] = [];
  showMember: boolean = false;
  selectedGroupId: string = '';
  private router = inject(Router);
  private userService = inject(UserService);

  searchText: string= ''

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);
   
    
  }
  constructor() {
   
    this.groupService
      .getAllGroups()
      .subscribe((res) => (this.groupsList = res.data));
     
  }
  ngOnInit(){
    this.groupService
      .getAllGroups()
      .subscribe((res) => (this.groupsList = res.data));
     this.showMember = false;
  }
  // ngDoCheck(){
  //   this.groupService
  //     .getAllGroups()
  //     .subscribe((res) => (this.groupsList = res.data));
      
  // }
  showAddMember(groupId: string) {
    this.showMember = true;
    this.selectedGroupId = groupId;
  }
  gotoAddTransaction(group_id: string) {
    this.router.navigate(['', 'group', group_id, 'transactions', 'add']);
  }
  gotoDetails(group_id: string) {
    this.router.navigate(['', 'group', group_id, 'detail']);
  }
  receiveStatusAddingMember(status: boolean) {
    if (status) {
      this.showMember = false;
    }
  }
  gotoReport(groupId: string) {
    this.router.navigate(['', 'group', groupId, 'report']);
   
  }
  
}
