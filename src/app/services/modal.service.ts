import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShoppingCartComponent } from '../modals/shopping-cart/shopping-cart.component';
import { Cart } from '../models/cart';

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

  // openNotifactionModal(success: boolean, message: string): MatDialogRef<NotificationModalComponent> {
  //   return this.dialog.open(NotificationModalComponent, {
  //     data: {
  //       success,  // Pass success status
  //       message,    // Pass the message to display in the modal
  //     },
  //     panelClass: 'custom-dialog-surface'
  //   });
  // }
}
