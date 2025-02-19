import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShoppingCartComponent } from '../modals/shopping-cart/shopping-cart.component';
import { Cart } from '../models/cart';
import { MyAccountModalComponent } from '../modals/my-account-modal/my-account-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openShoppingCartModal(cart: Cart): MatDialogRef<ShoppingCartComponent> {
    return this.dialog.open(ShoppingCartComponent, {
      data: {
        cart
      },
      panelClass: 'custom-dialog-surface'
    });
  }

  openMyAccount(): MatDialogRef<MyAccountModalComponent> {
    return this.dialog.open(MyAccountModalComponent, {
      data: {

      },
      panelClass: 'custom-dialog-surface'
    });
  }
}
