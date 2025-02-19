import { Component, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  cart: Cart = this.data.cart;

  constructor(
    public dialogRef: MatDialogRef<ShoppingCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
    this.dialogRef.close();
  }
}
