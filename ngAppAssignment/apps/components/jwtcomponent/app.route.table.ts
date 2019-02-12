import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import{LoginComponent} from "./app.login.component";
import{RegisterComponent} from "./app.register.component";
import{ProductComponent} from "./app.product.component";
import{AppGuardService} from "./../../services/app.jwt.test.guard.service";

const routes:Routes = [
    {
        path:"login", component:LoginComponent
    },
    {
        path:"register", component:RegisterComponent
    },
    {
        path:"",
        redirectTo:"login",
        pathMatch:"full"
    },
    {
        path:"product", 
        component:ProductComponent,
        canActivate:[AppGuardService]
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);