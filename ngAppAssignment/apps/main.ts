//1. angular module file
import { NgModule } from "@angular/core";

//1. imports all standard modules
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import{ FormsModule, ReactiveFormsModule} from "@angular/forms";
import{HttpModule} from "@angular/http";

//2. Import all services
import{ProductFormComponent} from "./components/productformcomponent/app.product.form.component";

import{SampleService} from "./services/app.sample.service";
import{ProductServiceComponent} from "./components/productservicecomponent/app.productservice.component";
import{HomeComponent} from "./components/routecomponents/app.home.components";
import {AboutComponent} from "./components/routecomponents/app.about.components";
import{ContactComponent} from "./components/routecomponents/app.contact.components";
//import{MainComponent} from "./components/routecomponents/app.main.components";
import{ErrorComponent} from "./components/routecomponents/app.error.component";
//import {routing} from "./components/routecomponents/app.route.table";
//import {AppGuardService} from "./services/app.test.guard.service";
import{LoginComponent} from "./components/jwtcomponent/app.login.component";
import{UserService} from "./services/app.jwt.user.service";
import{RegisterComponent} from "./components/jwtcomponent/app.register.component";
import { routing } from "./components/jwtcomponent/app.route.table";
import{JwtMainComponent} from "./components/jwtcomponent/app.jwt.main.component";
import{ProductComponent} from "./components/jwtcomponent/app.product.component";
import{ProductService} from "./services/app.jwt.products.service";
import{AppGuardService} from "./services/app.jwt.test.guard.service";


@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, 
        HttpModule, 
        routing
    ],
    declarations:[
        ProductFormComponent,
        ProductServiceComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        ErrorComponent,
        LoginComponent,
        RegisterComponent,
        JwtMainComponent,
        ProductComponent,
    ],
    providers:[
        SampleService,
        UserService,
        ProductService,
        AppGuardService
    ],
    bootstrap:[ProductFormComponent]
})
export class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);