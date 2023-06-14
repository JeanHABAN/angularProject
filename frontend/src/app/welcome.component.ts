import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  template: `
  <header id="showcase">
    <h1>Welcome To Split group app</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officiis ipsum officia numquam expedita ullam.</p>
    <button class="button" (click)="signin()">Sign in</button>
    <button class="button" (click)="signup()">Sign up</button>
  </header>
  <section id="section-a">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit min.</p>
  </section>
  <section id="section-b">
    <p>Lorem ipsum dolor sit ame</p>
  </section>

  `,
  styles: [`
  *{
  margin:0;
  padding:0;
}

body{
  margin:0;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size:17px;
  color:#926239;
  line-height:1.6;
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

#showcase h1{
  font-size:50px;
  line-height:1.2;
}

#showcase p{
  font-size:20px;
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
  background:#926239;
  color:#fff;
}

#section-a{
  padding:20px;
  background:#926239;
  color:#fff;
  text-align:center;
}

#section-b{
  padding:20px;
  background:#f4f4f4;
  text-align:center;
}

#section-c{
  display:flex;
}

#section-c div{
  padding:20px;
}

#section-c .box-1, #section-c .box-3{
  background:#926239;
  color:#fff;
}

#section-c .box-2{
  background:#f9f9f9;
}

  
  `
  ]
})
export class WelcomeComponent {
  private router = inject(Router);

  signin(){

  this.router.navigate(['','user','login'])
  }
  signup(){
   
    this.router.navigate(['','user','signup'])
  }
}
