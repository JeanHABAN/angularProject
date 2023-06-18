import { Component, inject } from '@angular/core';
import { GroupStateService, ITransaction } from './group-state.service';
import { IMember, UserService, initial_state_value } from '../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-report',
  template: `
   <header>
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
    <div class="table-container">
      <h2>Split Balance Report</h2>
      <table>
        <thead>
          <tr>
            <th>Member Name</th>
            <th>Spent Amount</th>
            <th>Owe Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let mb of memberBalances">
            <td
              [ngClass]="{
                'negative-value': mb.oweAmount <= 0,
                'positive-value': mb.oweAmount > 0
              }"
            >
              {{ mb.memberName }}
            </td>
            <td
              [ngClass]="{
                'negative-value': mb.oweAmount <= 0,
                'positive-value': mb.oweAmount > 0
              }"
            >
              {{ mb.spentAmount | currency }}
            </td>
            <td
              [ngClass]="{
                'negative-value': mb.oweAmount <= 0,
                'positive-value': mb.oweAmount > 0
              }"
            >
              {{ mb.oweAmount | currency }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .negative-value {
        background-color: green;
      }

      .positive-value {
        background-color: red;
      }
      .table-container {
        max-width: 800px;
        margin: 0 auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
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
.table-container{
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
      
    `
  ],
})
export class ReportComponent {
  private groupService = inject(GroupStateService);
  private activatedRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router)
  private group_id = this.activatedRoute.snapshot.paramMap.get('group_id');
  // private trans_id = this.activatedRoute.snapshot.paramMap.get('transaction_id');


  private members: IMember[] = [];
  private transactions: ITransaction[] = [];
  memberBalances: IBalanceReport[] = [];
  private totalAmountOfGroup: number = 0;

  ngOnInit() {
    this.groupService.getMembersFromGroup(this.group_id!).subscribe((res) => {
      this.members = res.data;
      this.groupService.getAllTransactions(this.group_id!).subscribe((res) => {
        this.transactions = res.data;
        this.totalAmountOfGroup = this.getTotalAmountForGroup();
       
        /////get single transaction by id 
      //  this.groupService.getTransactionById(this.group_id!, this.trans_id! ).subscribe(console.log)
        
        for (let m of this.members) {

          // this.memberBalances.push({
          //   memberName: m.fullname,
          //   spentAmount: this.getTotalAmountForMember(m.user_id),
          //   oweAmount:
          //     this.totalAmountOfGroup - this.getTotalAmountForMember(m.user_id),
          // });
          const spentAmount = this.getTotalAmountForMember(m.user_id);
          const oweAmount =
            spentAmount - (this.totalAmountOfGroup / this.members.length);
          this.memberBalances.push({
            memberName: m.fullname,
            spentAmount,
            oweAmount,
          });
        }
      });
    });
  }
  getTotalAmountForMember(memberId: string) {
    let total = 0;
    for (let t of this.transactions) {
      if (t.paid_by.user_id === memberId) {
        total = total + t.amount;
      }
    }
    return total;
  }
  getTotalAmountForGroup() {
    let total = 0;
    for (let t of this.transactions) {
      total = total + t.amount;
    }
    return total;
  }

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);
  }
}

export interface IBalanceReport {
  memberName: string;
  spentAmount: number;
  oweAmount: number;
}

// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker(new URL('./report.worker', import.meta.url));
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message: ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }

