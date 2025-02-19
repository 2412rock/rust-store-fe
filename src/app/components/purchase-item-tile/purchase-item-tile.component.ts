import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-purchase-item-tile',
  standalone: true,
  imports: [],
  templateUrl: './purchase-item-tile.component.html',
  styleUrl: './purchase-item-tile.component.scss'
})
export class PurchaseItemTileComponent {
  @Input() amount: number;
  @Input() price: number;
}
