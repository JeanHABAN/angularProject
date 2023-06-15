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
              Members
            </button>
            <button (click)="gotoDetails(g._id)" [disabled]="showMember">
              Details
            </button>
            <button (click)="gotoTransactions(g._id)" [disabled]="showMember">
              Transactions
            </button>
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
  showMember: boolean = false;
  selectedGroupId: string = '';
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
  showAddMember(groupId: string) {
    this.showMember = true;
    this.selectedGroupId = groupId;
  }
  gotoTransactions(group_id: string) {
    console.log('id ',group_id)
    this.router.navigate(['', 'group', group_id,'transaction']);
  }
  gotoDetails(group_id: string){
    this.router.navigate(['', 'group', group_id, 'detail']);
  }
  receiveStatusAddingMember(status: boolean){
    if( status) {
      this.showMember = false;
    }
  }
}
