import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Config {
  BaseURL = "https://localhost:44389";
  TokenEndpoint = '/api/token';
  ListEndpoint = '/api/users';
}