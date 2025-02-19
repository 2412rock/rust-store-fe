import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SteamAuthService {
  private apiKey = "3916E29B764656240B547A54EBFC4540"
 // private apiKey = 'YOUR_STEAM_API_KEY';  // 🔹 Replace with your Steam API Key
  private apiUrl = "http://localhost:4600";

  constructor(private http: HttpClient) {}

  getSteamProfile(steamId: string) {
    const url = `${this.apiUrl}/auth/profile?steamId=${steamId}`;
    return this.http.get<any>(url);
  }
}
