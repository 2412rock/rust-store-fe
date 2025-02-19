import { Component, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Cart, CartItem } from '../../models/cart';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../../components/checkout/checkout.component';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    CheckoutComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  cart: Cart = this.data.cart;
  public total: number | null;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ShoppingCartComponent>,
    private localStorage: LocalstorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){
    this.total =  this.getTotal();
  }

  deleteItem(name: string){
    let newItems: CartItem[] = [];
    let first = false;
    for(let i=0; i<this.cart.items.length; i++){
      if(this.cart.items[i].productName === name && !first){
        // skip first occurence
        first = true;
      }
      else{
        newItems.push(this.cart.items[i]);
      }
    }
    this.cart.items = newItems;
    this.total = this.getTotal();
  }

  getTotal() {
    let total = 0;
    for(let i=0; i<this.cart.items.length; i++){
      total += this.cart.items[i].price;
    }
    //return 10;
    return total;
  }

  close() {
    this.dialogRef.close();
  }

  checkout() {
    // Implement checkout logic here
    this.localStorage.setAmountToPay(this.getTotal());
    this.router.navigate(['/checkout']);
    this.dialogRef.close();
  }
}
