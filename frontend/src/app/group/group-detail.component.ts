import { Component, inject } from '@angular/core';
import { GroupStateService, IGroup, ITransaction } from './group-state.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-detail',
  template: `
<div class="table-container">
<table>
<thead>
      <tr>
        <th>title</th>
        <th>description</th>
        <th>category</th>
        <th>amount</th>
        <th>date</th>
        <th>paid_by</th>
        <th>receipt</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let trans of transactions">
        <td>{{ trans.title }}</td>
        <td>{{ trans.description }}</td>
        <td>{{ trans.category }}</td>
        <td>{{ trans.amount | currency }}</td>
        <td>{{ trans.date| date}}</td>
        <td>{{ trans.paid_by.fullname }}</td>
        <td>
        <a href="#" routerLink="['/report']">{{ trans.receipt.originalname }}</a>
             
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
  `
  ]
})
export class GroupDetailComponent {
  private groupService = inject(GroupStateService);
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  transactions: ITransaction[] = []; 
  private group_id = this.activatedRoute.snapshot.paramMap.get('group_id')

constructor(){
  if(this.group_id){
    this.groupService.getAllTransactions(this.group_id).subscribe(response =>{
      if(response.success){
        this.transactions = response.data
      }
    })

  }
}



}
