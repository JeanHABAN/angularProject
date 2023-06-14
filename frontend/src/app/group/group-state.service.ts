import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { IResponse, IUser } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class GroupStateService {
  private initial_state_value = {
    title: '',
    members: [],
    transactions: [],
  };
  private http = inject(HttpClient);
  groupState = signal(this.initial_state_value);

  addGroup(data: string) {
    return this.http.post<IResponse>(`${env.SERVER_URL}groups`, data);
  }
  getAllGroups() {
    return this.http.get<IResponse<IGroup[]>>(`${env.SERVER_URL}groups`);
  }
}

export interface IGroup {
  _id: string;
  title: string;
  members?: Array<IUser>;
  transactions: Array<ITransaction>;
}
export interface ITransaction {
  title: string;
  description: string;
  paid_by: { user_id: string; fullname: string };
  category: string;
  amount: number;
  date: number;
  receipt: { filename: string; originalname: string };
}

