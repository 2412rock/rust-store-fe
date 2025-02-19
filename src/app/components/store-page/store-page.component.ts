import { Component } from '@angular/core';
import { PurchaseItemTileComponent } from '../purchase-item-tile/purchase-item-tile.component';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [PurchaseItemTileComponent],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent {

}
