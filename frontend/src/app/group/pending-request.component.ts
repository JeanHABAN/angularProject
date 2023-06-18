import { Component, inject } from '@angular/core';
import { GroupStateService, IGroup } from './group-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, initial_state_value } from '../user/user.service';

@Component({
  selector: 'app-pending-request',
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
<div *ngFor="let group of groups" class="group-card">
  <h3 class="group-title">{{ group.title }}</h3>
  <button class="accept-button" (click)="acceptInvitation(group._id)">accept</button>
</div>

<ng-container *ngIf="groups.length === 0; else message">
  <p>No invitations available.</p>
</ng-container>

<ng-template #message>
  <p>Please click Accept button to join us</p>
</ng-template>

</div>
  `,
  styles: [`
  .group-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.group-title {
  font-size: 20px;
  margin-bottom: 5px;
}

.accept-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.accept-button:hover {
  background-color: #45a049;
}

p{
  font-size:48px;
  color: blue;
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
}
div {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

  `
  ]
})
export class PendingRequestComponent {
  private groupeService = inject(GroupStateService)
  private activatedRoute = inject(ActivatedRoute)
  private userService = inject(UserService);
  private router = inject(Router);

  group_id = this.activatedRoute.snapshot.paramMap.get('group_id')
  groups : IGroup []=[]

  ngOnInit() {
    this.getPendingGroups();
  }

  getPendingGroups(){
    this.groupeService.getStatus().subscribe(response =>{
      if(response.success){
        this.groups = response.data
        console.log(response.data)
      }
   
    })
  }

  acceptInvitation(groupId:string){
    const index = this.groups.findIndex((group) => group._id === groupId);
    if (index !== -1) {
      this.groups.splice(index, 1);
      console.log(this.userService.state()._id)
      this.updatePendingStatus(groupId, this.userService.state()._id)
      this.router.navigate(['', 'group', 'list'])
    }

  }

  updatePendingStatus(groupId: string, user_id: string) {
    this.groupeService.updateMemberPendingStatus(groupId, user_id).subscribe((response) => {
      if (response.success) {
        console.log('Pending status updated successfully' );
      }
    });
  }

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);
  }
}
