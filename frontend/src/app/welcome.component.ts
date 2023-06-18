import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, initial_state_value } from './user/user.service';

@Component({
  selector: 'app-welcome',
  template: `
 
 <div class="container">
 <div id="showcase">
    <h1>Welcome To Split group app</h1>
    <p>This app is designed to help users to split expenses and manage shared costs within a group or among friends. </p>
    <button *ngIf="!isSignedIn" class="button" (click)="signin()">Sign in</button>
    <button class="button" (click)="signup()">Sign up</button>
    <button *ngIf="isSignedIn" class="button" (click)="logout()">Logout</button>
  </div>
 </div>
 

  `,
  styles: [`


#showcase{
  background-size:cover;
  background-position:center;
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  padding:0 20px;
}


#showcase .button{
  font-size:18px;
  text-decoration:none;
  color:#926239;
  border:#926239 1px solid;
  padding:10px 20px;
  border-radius:10px;
  margin-top:20px;
}

#showcase .button:hover{
  background:green;
  color:#fff;
}

  `
  ]
})
export class WelcomeComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  isSignedIn: boolean  = false;
  constructor(){
    if( this.userService.state().jwt) this.isSignedIn = true;
  }
  signin(){

  this.router.navigate(['','user','login'])
  }
  signup(){
   
    this.router.navigate(['','user','signup'])
  }
  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.isSignedIn = false;
    
  }
}
