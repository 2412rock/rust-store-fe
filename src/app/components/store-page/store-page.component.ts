import { Component } from '@angular/core';
import { PurchaseItemTileComponent } from '../purchase-item-tile/purchase-item-tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [PurchaseItemTileComponent, CommonModule],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.scss'
})
export class StorePageComponent {

}
