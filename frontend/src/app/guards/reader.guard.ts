import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaderGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = JSON.parse(localStorage.getItem('ulogovan'))

      if (!user){
        this.router.navigate([""])
        return false
      }

      //moderator is reader with more privilege 
      if (user.type=="citalac" || user.type=="moderator"){
        return true;
      }else{
        this.router.navigate([""])
        return false
      }
    }

    
  
  
}
