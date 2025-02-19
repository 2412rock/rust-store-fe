import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setAmountToPay(amount: number){
    localStorage.setItem("totalamaount", amount.toString())
  }

  getAmpountToPay(){
    return localStorage.getItem("totalamaount")
  }
}
