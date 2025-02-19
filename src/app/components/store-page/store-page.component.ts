import { Component } from '@angular/core';
import { PurchaseItemTileComponent } from '../purchase-item-tile/purchase-item-tile.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { Cart, CartItem } from '../../models/cart';
import { SteamAuthService } from '../../services/steam-auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [PurchaseItemTileComponent, CommonModule, HttpClientModule],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss',
  providers: [ModalService, SteamAuthService], 
})
export class StorePageComponent {
  public cart = new Cart();
  public offers: Offer[];
  public profilePic: string | null;
  public name: string | null;
  constructor(private modalService: ModalService, private steamService: SteamAuthService, private localstorage: LocalstorageService){

  }

  ngOnInit(){
    this.offers = [];
    this.buildPrices();
    this.getUserData()
  }

  getUserData(){
    const steamId = this.localstorage.getSteamId(); // 🔹 Replace with the user's Steam ID
    if(steamId != null){
      this.steamService.getSteamProfile(steamId).subscribe(data => {
        try{
          let profile = data.response.players[0]; // Extract user details
        console.log("got profile ")
        console.log(profile)
        this.profilePic = profile.avatarfull;
        this.name = profile.personaname;
        }
        catch{
          this.profilePic = null;
          this.name = null;
        }
        
      });
    }
  }

  public buildPrices(){
    let offer0 = new Offer();
    offer0.shopPoints = 500;
    offer0.eur = 2;
    let offer1 = new Offer();
    offer1.shopPoints = 1000;
    offer1.eur = 5;
    let offer2 = new Offer();
    offer2.shopPoints = 2100;
    offer2.eur = 10;
    let offer3 = new Offer();
    offer3.shopPoints = 5500;
    offer3.eur = 29;
    let offer4 = new Offer();
    offer4.shopPoints = 11500;
    offer4.eur = 59;
    
    this.offers.push(offer0);
    this.offers.push(offer1);
    this.offers.push(offer2);
    this.offers.push(offer3);
    this.offers.push(offer4);

  }

  openMyAccount(){
    let result = this.modalService.openMyAccount();
    result.afterClosed().subscribe(e => {
      this.getUserData();
    })
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