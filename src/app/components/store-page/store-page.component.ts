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
  public offers: Offer[];
  constructor(private modalService: ModalService){

  }

  ngOnInit(){
    this.offers = [];
    this.buildPrices();
  }

  public buildPrices(){
    let offer1 = new Offer();
    offer1.shopPoints = 1000;
    offer1.eur = 5;
    let offer2 = new Offer();
    offer2.shopPoints = 2100;
    offer2.eur = 11;
    let offer3 = new Offer();
    offer3.shopPoints = 5500;
    offer3.eur = 29;
    let offer4 = new Offer();
    offer4.shopPoints = 11500;
    offer4.eur = 59;
    let offer5 = new Offer();
    offer5.shopPoints = 25000;
    offer5.eur = 119;
    this.offers.push(offer1);
    this.offers.push(offer2);
    this.offers.push(offer3);
    this.offers.push(offer4);
    this.offers.push(offer5);

  }

  openCart(){
    
    this.modalService.openShoppingCartModal(this.cart);
  }

  addToCart(offer: Offer){
    let cartItem = new CartItem();
    cartItem.productName = offer.shopPoints.toString();
    cartItem.price = offer.eur
   // cartItem.quantity = 1;
    this.cart.items.push(cartItem)
  }

}

export class Offer{
  public shopPoints: number;
  public eur: number;
}