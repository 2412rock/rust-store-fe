import { Component } from '@angular/core';
import { PaypaButtonComponent } from "../paypa-button/paypa-button.component";
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [PaypaButtonComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  
  public amount: string;

  constructor(private localStorageService: LocalstorageService){

  }

  ngOnInit(){
    this.amount =  this.localStorageService.getAmpountToPay() as string;
  }
}
