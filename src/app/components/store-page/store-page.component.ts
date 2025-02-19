import { Component } from '@angular/core';
import { PurchaseItemTileComponent } from '../purchase-item-tile/purchase-item-tile.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { Cart, CartItem } from '../../models/cart';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [PurchaseItemTileComponent, CommonModule],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss',
  providers: [ModalService], 
})
export class StorePageComponent {
  public cart = new Cart();
  constructor(private modalService: ModalService){

  }

  openCart(){
    
    this.modalService.openShoppingCartModal(this.cart);
  }

  addToCart(index: number){
    let cartItem = new CartItem();
    cartItem.productName = (index * 1000).toString();
    cartItem.price = index * 10;
   // cartItem.quantity = 1;
    this.cart.items.push(cartItem)
  }
}
