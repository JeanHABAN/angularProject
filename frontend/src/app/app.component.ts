import { Component, inject } from '@angular/core';
import { UserService, initial_state_value } from './user/user.service';

@Component({
  selector: 'app-root',
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
    <div class="mydata">
    <router-outlet></router-outlet> 
    </div>
  
  </div>

  <footer  class="footer">
  <section id="section-a">
    <p>The secret to managing your money is to know where it's going.</p>
  </section>
  <section id="section-b" >
    <p>copy-right@2023 Jean & Duyen</p>
  </section>
  </footer>`,
   
  styles: [`
   .footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
 
} 
  #section-a{
  padding:1px;
  background:green;
  color:#fff;
  text-align:center;
}
#section-b{
  padding:1px;
  background:#f4f4f4;
  text-align:center;
}
p{
  font-size:15px;
  font-weight:20px;
  font-family: "Chamberi Super Display", sans-serif;
}
header {
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
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
    font-size:20px;

}


.mydata{
  margin-top: 80px; 
}
.container{
  height: 125vh;
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


  `],
})
export class AppComponent {
 private userService = inject(UserService)

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
  
    
  }
}
