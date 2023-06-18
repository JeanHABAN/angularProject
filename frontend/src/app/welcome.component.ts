import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, initial_state_value } from './user/user.service';

@Component({
  selector: 'app-welcome',
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

header li a {
  color: black;
  text-decoration: none; 
} 

header li {
    margin: 20px;
    margin-right: 20px;
    font-size: 25px;

}


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
div {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
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
