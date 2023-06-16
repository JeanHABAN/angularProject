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

import { AddTransactionComponent } from './add-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './filter-pipe.pipe'; // -> imported filter pipe

@NgModule({
  declarations: [
    GroupListComponent,
    AddGroupComponent,
    AddMembersComponent,
    GroupDetailComponent,
    PendingRequestComponent,
    TransactionComponent,
    ReportComponent,
    FilterPipePipe,
    AddTransactionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'list', component: GroupListComponent },
      { path: 'add', component: AddGroupComponent },
      {
        path: 'addmember',
        component: AddMembersComponent,
      },
      { path: ':group_id/detail', component: GroupDetailComponent },
      { path: 'request', component: PendingRequestComponent },
      // { path: ':group_id/transactions', component: PendingTransactionsComponent },
      {
        path: ':group_id/transactions/add',
        component: AddTransactionComponent,
      },
      { path: ':group_id/report', component: ReportComponent },
    ]),
  ],
})
export class GroupModule {}
