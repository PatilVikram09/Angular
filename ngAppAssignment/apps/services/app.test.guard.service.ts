
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AppGuardService implements CanActivate{

    constructor(private _router:Router){}

    canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):boolean{
        console.log("canActivated");

        alert("You are not allowed to access this page. you are redirected to error page");

        this._router.navigate(["error"]);
        return false;
    }
}