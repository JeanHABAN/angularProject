import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list.component';
import { AddGroupComponent } from './add-group.component';
import { AddMembersComponent } from './add-members.component';
import { GroupDetailComponent } from './group-detail.component';
import { PendingRequestComponent } from './pending-request.component';
import { TransactionComponent } from './transaction.component';
import { ReportComponent } from './report.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GroupListComponent,
    AddGroupComponent,
    AddMembersComponent,
    GroupDetailComponent,
    PendingRequestComponent,
    TransactionComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: GroupListComponent },
      { path: 'add', component: AddGroupComponent },
      {
        path: 'addmember',
        component: AddMembersComponent,
      },
      { path: 'detail', component: GroupDetailComponent },
      { path: 'request', component: PendingRequestComponent },
      { path: 'transaction', component: TransactionComponent },
    ]),
  ],
})
export class GroupModule {}
