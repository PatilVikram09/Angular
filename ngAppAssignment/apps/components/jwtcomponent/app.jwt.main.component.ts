import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jwt-main-component',
    template: `

        <router-outlet></router-outlet>
    `
})
export class JwtMainComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
