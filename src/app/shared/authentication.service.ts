import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";

interface Token {
  exp: number;
  user : {
    id:string;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private api = 'http://kwm-evernote.s2110456008.student.kwmhgb.at/api/auth'
  constructor(private http:HttpClient) {}

  login(email:string,password:string){
    console.log(email);
    console.log(password);
    return this.http.post(`${this.api}/login`,{
      email:email,
      password:password
    });
  }

  // Token merken nach dem Einloggen
  public setSessionStorage(token:string){
    const decodedToken: Token = jwtDecode(token) as Token;
    console.log(decodedToken);
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("userId",decodedToken.user.id);
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public logout(){
    this.http.post(`${this.api}/logout`,{});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
  }

  public isLoggedIn():boolean {
    if(sessionStorage.getItem("token")){
      let token:string = <string>sessionStorage.getItem("token");
      const decodedToken: Token = jwtDecode(token) as Token;
      let expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()){
        sessionStorage.removeItem(token);
        return false;
      }
      return true;
    }else{
      return false;
    }
  }

  public isLoggedOut():boolean {
    return !this.isLoggedIn();
  }

}
