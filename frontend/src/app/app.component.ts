import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-hearder />
    <div class="container">
      <div class="mydata">
        <router-outlet />
      </div>
    </div>

    <app-footer />
  `,

  styles: [
    `
      .container {
        background-image: url('https://cdn.wallpapersafari.com/77/55/FoVknZ.jpg');

        background-size: cover;
        font-family: sans-serif;
        margin-top: 10px;
        padding: 20px;
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }
      /* .div {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      } */
      .mydata {
        margin-top: 80px;
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {
  title = 'frontend';
}
