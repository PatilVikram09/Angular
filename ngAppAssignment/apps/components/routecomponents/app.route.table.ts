import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core"
import { HomeComponent } from "./app.home.components";
import { AboutComponent } from "./app.about.components";
import { ContactComponent } from "./app.contact.components";
import{ErrorComponent} from "./app.error.component";
import { AppGuardService } from "../../services/app.test.guard.service";


//define route table
const routes:Routes=[
    {path:"home", component:HomeComponent},
    {path:'about/:id', component:AboutComponent},
    {
        path:'contact',
        component:ContactComponent,
        canActivate:[AppGuardService]
    },
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:"error",
        component:ErrorComponent
    }
];

//register the routetable for root of the current NG app
//with 'routing' is provided to "imports" of MgModule, this will load RouterModule 
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);