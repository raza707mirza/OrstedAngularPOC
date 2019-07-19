import { Injectable } from '@angular/core';
import {Config} from '../../config';
import {TokenModel} from '../Models/token-model';
import {UserModel} from '../Models/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  private _config: Config;
  private _httpClient: HttpClient;
  constructor(private config: Config, private http: HttpClient) {
    this._config = config;
    this._httpClient = http;
   }

  GetToken(username:string, password: string): Promise<TokenModel>{
    //return this._httpClient.post<TokenModel>(this._config.BaseURL + this._config.TokenEndpoint + '?username='//+username+'&password=' + password,'');

    return new Promise<TokenModel>((resolve, reject) => {
      this._httpClient.post<TokenModel>(this._config.BaseURL + this._config.TokenEndpoint + '?username='+username+'&password=' + password,'')
        .toPromise()
        .then((response) => {
            resolve(response);
        })
        .catch((response)=>{
          reject(response);
        });
    });

  }

  GetUsersList(): Promise<UserModel[]>{
    return new Promise<any>((resolve, reject) => {
      this._httpClient.get<UserModel[]>(this._config.BaseURL + this._config.ListEndpoint)
        .toPromise()
        .then((response) => {
            resolve(response);
        });
    });
  }
}