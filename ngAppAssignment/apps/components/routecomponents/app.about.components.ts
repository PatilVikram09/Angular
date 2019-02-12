import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-about-component',
    template: `
    <h2>About Component</h2>
    <div class="container">{{message}}</div>
    <br/>
    <div class="container"> Value is: {{value}} </div>
    <br/>
    <input type="button" value="Navigate to Contact" (click)="navigateToContact()"/>
`
})
export class AboutComponent implements OnInit {
    message:string;
    value:number;

    //the injection of router and ActivatedRoute will fetch router object from Routermodule imported in NgModule using "routing"
    constructor(private router:Router, private act:ActivatedRoute) {
        this.message = "I am about component"
     }

     //explicitely routed to contact
     navigateToContact():void{
        this.router.navigate(["contact"]);
     }

    //subscribe to parameter from SctivatedRoute object
    ngOnInit(): void { 
        this.act.params.subscribe((params)=>{
            this.value = params.id;
        });
    }
}
