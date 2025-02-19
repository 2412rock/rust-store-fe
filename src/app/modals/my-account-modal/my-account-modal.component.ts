import { Component, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Cart } from '../../models/cart';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../../components/checkout/checkout.component';
import { LocalstorageService } from '../../services/localstorage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-my-account-modal',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule],
  templateUrl: './my-account-modal.component.html',
  styleUrl: './my-account-modal.component.scss'
})
export class MyAccountModalComponent {

  public currentSteamId: string | null;
  public updatedSteamId: string;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<MyAccountModalComponent>,
    private localStorage: LocalstorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){
    this.currentSteamId = this.localStorage.getSteamId();
  }

  close(){
    this.dialogRef.close();
  }

  change(){
    console.log("Updated steam id ", this.updatedSteamId);
    this.localStorage.setSteamId(this.updatedSteamId);
    this.close();
  }
}
