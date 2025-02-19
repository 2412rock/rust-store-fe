import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PaypaButtonComponent } from "./components/paypa-button/paypa-button.component";
import { StorePageComponent } from './components/store-page/store-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaypaButtonComponent, StorePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rust-store';

  constructor(private router: Router){

  }

  ngOnInit(){
    this.router.navigate(['./store'])
  }
}
