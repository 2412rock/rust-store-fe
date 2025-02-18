import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaypaButtonComponent } from "./components/paypa-button/paypa-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaypaButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rust-store';
}
