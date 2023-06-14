import { Component, inject } from '@angular/core';
import { IUser, UserService } from '../user/user.service';

@Component({
  selector: 'app-add-members',
  template: `
    <h2>Select Members</h2>
    <table>
      <th>Name</th>
      <th>Email</th>
      <th>Select</th>
      <tr *ngFor="let u of usersList">
        <td>{{ u.fullname }}</td>
        <td>{{ u.email }}</td>
        <td><input type="checkbox" [checked]="addMember()" /></td>
      </tr>
    </table>
    <button>Submit</button>
  `,
  styles: [],
})
export class AddMembersComponent {
  usersList: IUser[] = [];
  private userService = inject(UserService);
  constructor() {
    this.userService.getUsers().subscribe((res) => (this.usersList = res.data));
  }
  addMember(){}
}
