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

  setSteamId(id: string){
    localStorage.setItem("steamid", id);
  }

  getSteamId(){
    return localStorage.getItem("steamid");
  }
}
