import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import { UserModel } from '../ludyModel/user-model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userIsActive = false;

  constructor(private httpCl: HttpClient) { }

  isLogin(): boolean {
    if(this.userIsActive){
      return true;
    }

    return false;
  }

  getLoginInfos(): any{
    debugger
    return this.httpCl.get<any>("http://sems.vms.idial.fh:8086/api/v2/me").subscribe((res)=>{
      debugger
      if(res.active){
        this.userIsActive = true;
      }
    });
   
  }
  
  loginCallback(){
    //return this.httpCl.post("http://sems.vms.idial.fh:8086/api/v2/signin", );
  }
}
