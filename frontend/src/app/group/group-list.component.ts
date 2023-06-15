import { Component, inject } from '@angular/core';
import { GroupStateService, IGroup } from './group-state.service';
import { Router } from '@angular/router';
import { UserService, initial_state_value } from '../user/user.service';


@Component({
  selector: 'app-group-list',
  template: `
    <div>
      <a [routerLink]="['', 'group', 'add']">Add Group</a>
      <a [routerLink]="['', 'group', 'request']">Pending Request</a>
      <a (click)="logout()">Logout</a>
    </div>
    <div><input placeholder="search group here" /></div>
    <div>
      <table>
        <th>Title</th>
        <th>Action</th>
        <tr *ngFor="let g of groupsList">
          <td>{{ g.title }}</td>
          <td>
            <button (click)="gotoMember()">Members</button>
            <button (click)="gotoDetails(g._id)">Details</button>
            <button (click)="gotoTransactions(g._id)">Transactions</button>
          </td>
        </tr>
      </table>
    </div>
  `,
  styles: [],
})
export class GroupListComponent {
  groupService = inject(GroupStateService);
  groupsList: IGroup[] = [];
  private router = inject(Router);
  private userService = inject(UserService);
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
  gotoMember() {
    this.router.navigate(['', 'group', 'addmember']);
  }
  gotoTransactions(group_id: string) {
    console.log('id ',group_id)
    this.router.navigate(['', 'group', group_id,'transaction']);
  }
  gotoDetails(group_id: string){
    this.router.navigate(['', 'group',group_id, 'detail']);
  }
}
