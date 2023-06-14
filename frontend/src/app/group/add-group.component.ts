import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { GroupStateService } from './group-state.service';
import { Router } from '@angular/router';
import { IResponse } from '../user/user.service';

@Component({
  selector: 'app-add-group',
  template: `
    <h2>Add New Group</h2>
    <form [formGroup]="addGoupForm" (ngSubmit)="addGroup()">
      <input placeholder="Title" formControlName="title" />
      <button type="submit" [disabled]="addGoupForm.invalid">Add Group</button>
    </form>
  `,
  styles: [],
})
export class AddGroupComponent {
  addGoupForm = inject(FormBuilder).group({
    title: ['', Validators.required],
  });
  private groupService = inject(GroupStateService);
  private router = inject(Router);

  addGroup() {
    this.groupService
      .addGroup(this.addGoupForm.value as string)
      .subscribe((res) => {
        if (res.success) {
          this.router.navigate(['', 'group', 'list']);
        }
      });
  }
}
